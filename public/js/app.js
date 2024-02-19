(async () => {
    try {
        const response = await fetch(`https://picsum.photos/id/${Math.floor(Math.random() * 50)}/500?grayscale`)
        document.getElementsByTagName('img')[0].src = URL.createObjectURL(await response.blob())
    } catch (error) {
        console.log(error)
    }
})()