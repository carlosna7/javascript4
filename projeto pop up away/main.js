const htmlElem = document.querySelector("html")

console.log(htmlElem)

htmlElem.addEventListener("mouseleave", (e) => {
    const item = e.relatedTarget
    const modal = document.querySelector(".modalBackGround")
    // console.log(modal)
    // console.log(item)
    if(item === null) {
        
        modal.className = "modalBackGround"
        
    }
})

const button = document.querySelector(".btnx")

button.addEventListener("click", (e) => {
    e.preventDefault()

    const modal = document.querySelector(".modalBackGround")

    modal.className = "modalBackGround displayNone"
})

// function addEvent(obj, evt, fn) {
//     if (obj.addEventListener) {
//         obj.addEventListener(evt, fn, false);
//     } else if (obj.attachEvent) {
//         obj.attachEvent("on" + evt, fn);
//     }
// }

// addEvent(htmlElem, "mouseout", function(e) {
//     e = e ? e : window;
//     const from = e.relatedTarget || e.toElement;
//     console.log(from.nodeName)
//     if (from.nodeName === "HTML") {
        
//         alert("left window");
//     }
// })

