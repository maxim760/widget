window.addEventListener('message', onMessage)
function getWidget() {
  return document.querySelector('#sycret-widget')
}
const height = {
  small: '200px',
  big: '400px',
}

let isStarted = false

window.addEventListener('resize', onResize)

function getHeightBeforeStart() {
  return window.innerWidth < 600 ? height.small : height.big
}

const widget = getWidget()
if (widget) {
  widget.style.height = getHeightBeforeStart()
}
function onMessage(e) {
  const data = e.data
  if (!data || (data && data.type !== 'sycret')) {
    return
  }
  const widget = getWidget()
  if (data.status === 'start') {
    widget.style.height = height.big
    isStarted = true
  } else {
    widget.style.height = getHeightBeforeStart()
    isStarted = false
  }
}

function onResize() {
  const widget = getWidget()
  if (!widget) {
    return
  }
  if (isStarted && window.innerWidth >= 600) {
    widget.style.height = height.big
    return
  }
  if (!isStarted && window.innerWidth < 600) {
    widget.style.height = height.small
  }
}

function openSycretCertificate(options) {
  var query = Object.keys(options)
    .filter((k) => options[k])
    .map((k) => `${k}=${options[k]}`)
    .join('&')
  window.open(`https://certificate-react.vercel.app/?${query}`, '_blank')
}
