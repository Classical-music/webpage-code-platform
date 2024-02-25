export function regDirective(app) {
  createDrag(app);
}

function createDrag(app) {
  app.directive("drag-move", (el, binding) => {
    let param = binding.value
    let { x, y } = param.pos
    el.onmousedown = function(ev1) {
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      
        function onMouseMove(ev2) {
            param.pos.x = x + (ev2.pageX - ev1.pageX)
            if (param.pos.x < 0) param.pos.x = 0
            param.pos.y = y + (ev2.pageY - ev1.pageY)
            if (param.pos.y < 0) param.pos.y = 0
        }
      
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        };
      };
  });
}
