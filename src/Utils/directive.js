export function regDirective(app) {
  createDrag(app);
}

function createDrag(app) {
  app.directive("drag-move", (el, binding) => {
    let item = binding.value
    let { x, y } = item
    el.onmousedown = function(ev1) {
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      
        function onMouseMove(ev2) {
            item.x = x + (ev2.pageX - ev1.pageX)
            if (item.x < 0) item.x = 0
            item.y = y + (ev2.pageY - ev1.pageY)
            if (item.y < 0) item.y = 0
        }
      
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        };
      };
  });
}
