let colorsArray = []

document.addEventListener('click', function(e) {
    if (e.target.dataset.color) {
        const targetColor = e.target.dataset.color
        const targetColorEl = document.getElementById(targetColor)

        navigator.clipboard.writeText(targetColor)
        targetColorEl.textContent = "Copied!"
        setTimeout(() => {
            targetColorEl.textContent = `#${targetColor}`
          }, 1000);
    }
})

function getColorScheme() {
    const color = document.getElementById('color').value.substring(1)
    const mode = document.getElementById('mode-select').value

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
        .then(res => res.json())
        .then(data => {
            colorsArray = data.colors
            renderColors()
    })
}

function renderColors() {
    html = ""
    colorsArray.forEach(color => {
        html += `
            <div>
                <img src="${color.image.bare}" class="color-img">
                <p id="${color.hex.clean}" data-color="${color.hex.clean}">${color.hex.value}</p>
            </div>
        `
    })
    document.getElementById('color-scheme').innerHTML = html
}

document.getElementById('color-form').addEventListener('submit', function(e) {
    e.preventDefault()
    getColorScheme()
})

getColorScheme()