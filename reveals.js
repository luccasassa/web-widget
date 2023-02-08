window.sr = ScrollReveal();

sr.reveal('.date-clock', {
  duration: '1000',
  origin: 'left',
  distance: '-500px'
})

sr.reveal('.date-today', {
  duration: '1000',
  origin: 'right',
  distance: '-500px'
})

sr.reveal('.weather', {
  delay: 575,
  duration: 600,
  reset: true
})

sr.reveal('.browser', {
  duration: '1000',
  origin: 'left',
  distance: '-500px'
})

sr.reveal('.os', {
  duration: '1000',
  origin: 'right',
  distance: '-500px'
})

sr.reveal('#network-status', {
  duration: '1000',
  origin: 'bottom',
  distance: '500px'
})
