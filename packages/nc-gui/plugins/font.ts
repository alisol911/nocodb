export default defineNuxtPlugin(() => {
  // Listen when 'Material Symbols' font is loaded
  // and remove 'nc-fonts-not-loaded' class from <html> element

  function getFont() {
    let result: any
    document.fonts.forEach((fontFace) => {
      if (fontFace.family === 'Material Symbols') {
        result = fontFace
      }
    })
    return result
  }
  try {
    document.documentElement?.classList.add('nc-fonts-not-loaded')

    const materialFont = getFont()

    if (!materialFont || !materialFont.loaded) {
      document.documentElement?.classList.remove('nc-fonts-not-loaded')
      return
    }

    materialFont.loaded
      .then(function () {
        document.documentElement?.classList.remove('nc-fonts-not-loaded')
      })
      .catch(function (error) {
        document.documentElement?.classList.remove('nc-fonts-not-loaded')
        console.error(error)
      })

    // Safari issue where loaded promise is always in pending state.
    // So we need to poll for font status to be 'unloaded'
    let intervalId: any

    function poll() {
      const materialFont = getFont()

      if (materialFont?.status === 'unloaded') {
        document.documentElement?.classList.remove('nc-fonts-not-loaded')
        stopPolling()
      } else if (materialFont?.status === 'loaded') {
        stopPolling()
      }
    }

    function startPolling(interval: number) {
      intervalId = setInterval(poll, interval)
    }

    function stopPolling() {
      clearInterval(intervalId)
    }

    startPolling(200)
  } catch (error) {
    document.documentElement?.classList.remove('nc-fonts-not-loaded')
    console.error(error)
  }
})
