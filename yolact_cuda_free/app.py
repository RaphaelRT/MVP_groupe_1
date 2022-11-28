import os
import base64
from flask import Flask, request, abort, jsonify, send_from_directory
import json
import subprocess
from PIL import Image
from flask import send_file

UPLOAD_DIRECTORY = "./test"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

api = Flask(__name__)
@api.route("/files/<filename>", methods=["POST"])
def post_file(filename):
    """Upload a file."""

    if "/" in filename:
        # Return 400 BAD REQUEST
        abort(400, "no subdirectories allowed")
    
    data = json.loads(request.data)["data"]
    image_64_decode = base64.b64decode(data)
    
    with open(os.path.join(UPLOAD_DIRECTORY, filename), "wb") as fp:
        fp.write(image_64_decode)
    image = Image.open(os.path.join(UPLOAD_DIRECTORY, filename))
    api.logger.debug(f"{(image.size[0]*4, image.size[1]*4)}")
    new_image = image.resize((image.size[0]*4, image.size[1]*4))
    image.save(os.path.join(UPLOAD_DIRECTORY, filename))

    # Return 201 CREATED
    return "", 201
@api.route("/predict/<filename>", methods=["GET"])
def predict(filename):
    """Predict"""
    
    if "/" in filename:
        # Return 400 BAD REQUEST
        abort(400, "no subdirectories allowed")
    path = os.path.join(UPLOAD_DIRECTORY, filename)
    #This command could have multiple commands separated by a new line \n
    some_command = f"python eval.py --trained_model=yolact_custom_config_60_887184.pth --score_threshold=0.01 --top_k=6 --image={path} --cuda=False"

    p = subprocess.Popen(some_command, stdout=subprocess.PIPE, shell=True)

    (output, err) = p.communicate()  

    #This makes the wait possible
    p_status = p.wait()
    api.logger.debug(p_status)
    if p_status == 0 :
        return "finished", 200
    else :
        return "started", 201

@api.route('/download/<filename>', methods=["GET"])
def downloadFile (filename):
    #For windows you need to use drive name [ex: F:/Example.pdf]
    path = os.getcwd() + os.sep + "results_img" + os.sep + filename
    return send_file(path, as_attachment=True)
    
if __name__ == "__main__":
    api.run(debug=True, port=8000, host='0.0.0.0')