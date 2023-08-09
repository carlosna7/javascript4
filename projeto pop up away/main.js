const htmlElem = document.querySelector("body")

console.log(htmlElem)

htmlElem.addEventListener("mouseover", (e) => {

    const item = e.relatedTarget
    if(item.nodeName === "HTML") {
        alert("left window");
    }
})


// function addEvent(obj, evt, fn) {
//     if (obj.addEventListener) {
//         obj.addEventListener(evt, fn, false);
//     } else if (obj.attachEvent) {
//         obj.attachEvent("on" + evt, fn);
//     }
// }

// addEvent(body, "mouseout", function(e) {
//     e = e ? e : window;
//     const from = e.relatedTarget || e.toElement;
//     console.log(from.nodeName)
//     if (from.nodeName === "HTML") {
        
//         alert("left window");
//     }
// })

