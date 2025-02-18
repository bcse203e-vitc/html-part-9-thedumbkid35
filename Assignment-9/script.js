document.addEventListener("DOMContentLoaded",loadAppointments);

function openForm(serviceType){
    document.getElementById("service").value = serviceType;
    document.getElementById("bookingForm").style.display = "block";
}

function closeForm(){
    console.log("closeForm called");
    document.getElementById("bookingForm").style.display = "none";
}

document.getElementById("appointmentForm").addEventListener("submit",function(event){
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let service = document.getElementById("service").value;
    let datetime = document.getElementById("datetime").value;
    let terms = document.getElementById("terms").checked; 
    let requests = document.getElementById("requests").value.trim();

    if ( name === "" || email === "" || phone.length !== 10 ||  !terms){
        alert("Please fill all fields correctly.");
        return;
    }

    if(new Date(datetime) < new Date()){
        alert("Date & Time must be in the future.");
        return;
    }

    let appointment = {
        name,email,phone,service,datetime,requests,status: "Pending"
    };

    saveAppointment(appointment);
    closeForm();
    loadAppointments();
    alert(`Thank you, ${name}! Your appointment for ${service} on ${datetime} is confirmed.`);
});

function saveAppointment(appointment){
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments",JSON.stringify(appointments));
}

function loadAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let appointmentList = document.getElementById("appointmentList");
    appointmentList.innerHTML = "";

    appointments.forEach((appointment) => {
        let row = document.createElement("tr");

        row.innerHTML = `<td>${appointment.name}</td>
        <td>${appointment.service}</td>
        <td>${appointment.datetime}</td>
        <td>${appointment.status}</td>
        <td>${appointment.requests}</td>`;

        appointmentList.appendChild(row);
    });


function clearAppointments() {
    localStorage.removeItem("appointments");
    document.getElementById("appointmentList").innerHTML = "";
    alert("All appointments have been cleared!");
}


}