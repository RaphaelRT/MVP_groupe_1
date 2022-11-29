import Paper from "paper";

const polygon = () => {
  var path;
  Paper.view.onMouseDown = (event) => {
    // Create a new path and give it a stroke color:
    path = new Paper.Path();
    path.strokeColor = '#ffffff';
    path.add(new Paper.Point(event.point.x/2, event.point.y/2));
  };

  Paper.view.onMouseDrag = (event) =>{
    path.add(new Paper.Point(event.point.x/2, event.point.y/2));
  }

  Paper.view.draw();
};

export default polygon;

