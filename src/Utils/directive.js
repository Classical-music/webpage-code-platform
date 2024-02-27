export function regDirective(app) {
  createDragMove(app)

  createReSize(app, 'lt')
  createReSize(app, 't')
  createReSize(app, 'rt')
  createReSize(app, 'l')
  createReSize(app, 'r')
  createReSize(app, 'lb')
  createReSize(app, 'b')
  createReSize(app, 'rb')
}

function createDragMove(app) {
  app.directive("drag-move", (el, binding) => {
    let param = binding.value
    let { x, y } = param.pos
    el.onmousedown = function(ev1) {
      ev1.stopPropagation()
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

function createReSize(app, flag) {
  app.directive(`${flag}-resize`, (el, binding) => {
    let param = binding.value

    el.onmousedown = function(ev1) {
      let { x, y } = param.pos
      let { w, h } = param.size
      ev1.stopPropagation()
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)

      function onMouseMove(ev2) {
        if (flag[0] === 'l') {
          setLeft(ev2.pageX - ev1.pageX)
        } else if (flag[0] === 'r') {
          setRight(ev2.pageX - ev1.pageX)
        }
        
        if (flag.indexOf('t') != -1) {
          setTop(ev2.pageY - ev1.pageY)
        } else if (flag.indexOf('b') != -1) {
          setBottom(ev2.pageY - ev1.pageY)
        }
      }

      function setLeft(posx) {
        if (posx < -x) posx = -x
        if (posx > w - 30) posx = w - 30
        param.pos.x = x + posx
        param.size.w = w - posx
      }
      function setTop(posy) {
        if (posy < -y) posy = -y
        if (posy > h - 30) posy = h - 30
        param.pos.y = y + posy
        param.size.h = h - posy
      }
      function setRight(posx) {
        if (posx < 30 - w) posx = 30 - w
        param.size.w = w + posx
      }
      function setBottom(posy) {
        if (posy < 30 - h) posy = 30 - h
        param.size.h = h + posy
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
    }
  })
}
