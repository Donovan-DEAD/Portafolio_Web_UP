

const form_submission = ()=>{
    const Schedule_table = document.getElementById("Schedule_table_body")

    var date = document.getElementById("date").value
    var start_time = document.getElementById("start_time").value
    var end_time = document.getElementById("end_time").value
    var activity = document.getElementById("activity").value
    var place = document.getElementById("place").value
    var type = document.getElementById("type").value
    var notes = document.getElementById("notes").value
    var status = document.getElementById("busy").checked

    if (!date || !start_time || !end_time || !activity || !place || !type || !notes){
        alert("Please fill out all fields")
        return
    }

    const register_activity = document.createElement("tr")

    const date_node = document.createElement("td")
    const start_time_node = document.createElement("td")
    const end_time_node = document.createElement("td")
    const activity_node = document.createElement("td")
    const place_node = document.createElement("td")
    const type_node = document.createElement("td")
    const notes_node = document.createElement("td")
    const status_node = document.createElement("td")

    date_node.innerHTML = date
    start_time_node.innerHTML = start_time
    end_time_node.innerHTML = end_time
    activity_node.innerHTML = activity
    place_node.innerHTML = place
    type_node.innerHTML = type
    notes_node.innerHTML = notes
    
    img_status_node = document.createElement("img")
    img_status_node.src = status?"images/free.png":"images/busy.png"
    status_node.appendChild(img_status_node)

    register_activity.appendChild(date_node)
    console.log("Date node appended:", date_node.innerHTML);

    register_activity.appendChild(start_time_node)
    console.log("Start time node appended:", start_time_node.innerHTML);

    register_activity.appendChild(end_time_node)
    console.log("End time node appended:", end_time_node.innerHTML);

    register_activity.appendChild(activity_node)
    console.log("Activity node appended:", activity_node.innerHTML);

    register_activity.appendChild(place_node)
    console.log("Place node appended:", place_node.innerHTML);

    register_activity.appendChild(type_node)
    console.log("Type node appended:", type_node.innerHTML);

    register_activity.appendChild(notes_node)
    console.log("Notes node appended:", notes_node.innerHTML);

    register_activity.appendChild(status_node)
    console.log("Status node appended:", status_node.innerHTML);

    Schedule_table.appendChild(register_activity)
    console.log("Schedule table appended:", Schedule_table.children);
}