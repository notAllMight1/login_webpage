async function  login() {
    const user_id = document.getElementById("user_id").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    try{
        const response = await fetch("users.json"); //fetching user details from the json file
        const data = await response.json();
        
        const user = data.users.find(user=> user.user_id === user_id && user.password === password) //here we check if the user exist in our josn file

        if(user){
            document.cookie=`user_id=${user_id};path=/`;
            window.location.href = "landing.html";
        }
        else{
            errorMessage.textContent="Invalid Credentials. Please try again.";
        }
    }
    catch(error){
        console.error("Error loading JSON:", error);
    }
}

function addStudent(){
    const table = document.getElementById("studentTable");
    const row = table.insertRow();

    row.innerHTML = `
    <td>New Student</td>
    <td>0</td>
    <td>newstu@example.com</td>
    <td>0000000000</td>
    <td><input type="checkbox" class="degree1" disabled></td>
    <td><input type="checkbox" class="degree2" disabled></td>
    <td><input type="checkbox" class="degree3" disabled></td>
    <td>
    <button onclick="editStudent(this)">Edit</button>
    <button onclick="deleteStudent(this)">Delete</button>
    </td>
    `
}

function editStudent(button){
    const row = button.parentNode.parentNode;
    const degree1 = row.querySelector(".degree1");
    const degree2 = row.querySelector(".degree2");
    const degree3 = row.querySelector(".degree3");
    row.contentEditable = row.contentEditable ==="true" ? "false": "true";
    button.textContent = button.textContent === "Edit" ? "Save": "Edit";

    if(button.textContent === "Edit"){
        degree1.disabled = true;
        degree2.disabled = true;
        degree3.disabled = true;
    }
    else{
        degree1.disabled = false;
        degree2.disabled = false;
        degree3.disabled = false;
    }
}

function deleteStudent(button){
    const row = button.parentNode.parentNode;
    row.remove();
}

function logout(){

    //clear any session data which is cookie in this sense 
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
}