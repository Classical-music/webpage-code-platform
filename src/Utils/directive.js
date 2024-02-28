/**
 * 创建自定义指令
 * @param {Object} app 由createApp 接口创建的对象
 */
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

/**
 * 自定义指令: v-drag-move 鼠标拖动控件移动
 * @param {Object} app vue app对象
 */
function createDragMove(app) {
  app.directive("drag-move", (el, binding) => {
    let param = binding.value
    let { x, y } = param.rect
    el.onmousedown = function(ev1) {
      ev1.stopPropagation()
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    
      function onMouseMove(ev2) {
          param.rect.x = x + (ev2.pageX - ev1.pageX)
          if (param.rect.x < 0) param.rect.x = 0
          param.rect.y = y + (ev2.pageY - ev1.pageY)
          if (param.rect.y < 0) param.rect.y = 0
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
      let { x, y } = param.rect
      let { w, h } = param.rect
      ev1.stopPropagation()
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener("click", onClick, true);

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

      function setLeft(rectx) {
        if (rectx < -x) rectx = -x
        if (rectx > w - 30) rectx = w - 30
        param.rect.x = x + rectx
        param.rect.w = w - rectx
      }
      function setTop(recty) {
        if (recty < -y) recty = -y
        if (recty > h - 30) recty = h - 30
        param.rect.y = y + recty
        param.rect.h = h - recty
      }
      function setRight(rectx) {
        if (rectx < 30 - w) rectx = 30 - w
        param.rect.w = w + rectx
      }
      function setBottom(recty) {
        if (recty < 30 - h) recty = 30 - h
        param.rect.h = h + recty
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        setTimeout(_ => {
          document.removeEventListener('click', onClick, true)
        }, 1)
      }
    }

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  })
}
