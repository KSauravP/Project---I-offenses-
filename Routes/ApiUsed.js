App = {
    getreported: function() {
        const api_url ="http://localhost:5000/reported_crime";
        // console.log(api_url);
        // let usr_name = sessionStorage.getItem('usrname');
        tab_Content.innerHTML = " ";
        data =this.getapi(api_url).then(data=>{
            
            for(var i = 0; i <= data.length; i++) {
                var a = "<tr  scope='row'><td>"+data[i].reported_id+"</td><td>"+data[i].user_id+"</td><td>"+data[i].f_name+"</td><td><span class='material-icons' data-target='#changedata' onclick='rep_display("+data[i].reported_id+")'>unfold_more</span></td></tr>";

                tab_Content.innerHTML += a;
            }
        });
    },

    //PoliceAuthenticateapi
    getpatreported: function(i) {
        var x = document.getElementById("changeRecordForm");
        const api_url ="http://localhost:5000/reported_crimes/"+i;
       
        // /* console.log(api_url);reported_id int primary key	auto_increment,
        
        data =this.getapi(api_url).then(data=>{
                x.elements[0].value = data[0].reported_id,
                x.elements[1].value = data[0].user_id,
                x.elements[2].value = data[0].area_pin,
                x.elements[3].value = data[0].reported_time,
                x.elements[4].value = data[0].reported_date,
                x.elements[5].value = data[0].reported_ctype,
                x.elements[6].value = data[0].reprorted_desc,
                x.elements[7].value = data[0].reported_place,
                x.elements[8].value = data[0].doc
                $("#changedata").modal()
        });
    },

    postauthenticate: function() {
        var xhr = new XMLHttpRequest();
        var dta = JSON.stringify({
            "auth": 
                {
                    "user_id": document.getElementById("usr_id").value,
                    "area_pin": parseInt(document.getElementById("area_pin").value),
                    "crime_time": document.getElementById("rep_time").value,
                    "crime_date": document.getElementById("rep_date").value,
                    "crime_type": document.getElementById("rep_type").value,
                    "crime_description": document.getElementById("rep_des").value,
                    "crime_place": document.getElementById("rep_place").value,
                    "document": document.getElementById("doc").value,
                    "curr_status": "Authenticated",
                    "police_id": sessionStorage.getItem('usrname'),
                    "reported_id": document.getElementById('rep_idn').value
                }
        });
        xhr.open("POST", "http://localhost:5000/Authenticateinsert", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(dta);
        xhr.send(dta);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
               App.getreported();
            }
          };
    },



    // login: function(){
    //     console.log('yes');
    //     var usr_id = parseInt(document.getElementById("uid").value);
    //     var usr_passw = document.getElementById("upassw").value ;
    //     const api_url = "http://localhost:5000/suser/"+usr_id+"/"+usr_passw;
    //     console.log('calling url');
    //     // this.getapi(api_url);
    //     data=this.getapi(api_url).then(data =>{
    //         console.log(session.usr_id);
    //     });
    // },





    login: function(){
        var usr_id = (document.getElementById("uid").value);
        var usr_passw = document.getElementById("upassw").value ;
        const api_url = "http://localhost:5000/suser/"+usr_id;
        data = this.getapi(api_url).then(data=>{
            if(data.length > 0)
            {
                if(data[0].login_password==usr_passw)
                {
                    const sess = "http://localhost:5000/reqsession";
                    getapi(sess);
                    sessionStorage.setItem('usrname',data[0].login_id)
                    if(data[0].user_type == "police" || data[0].user_type == "Police" || data[0].user_type == "POLICE")
                    {
                        window.location.href = 'http://127.0.0.1:5501/HTML/PoliceHomepage.html';
                    }
                    else if(data[0].user_type == "admin" || data[0].user_type == "Admin" || data[0].user_type == "ADMIN")
                    {
                        window.location.href = "http://127.0.0.1:5501/HTML/AdminHomepage.html";
                    }
                    else
                    {
                        window.location.href = 'http://127.0.0.1:5501/HTML/Homepage.html';
                    }
                }
                else{
                    alert("Wrong Password !!");
                }
            }
            else
            {
                alert("User Dosen't Exist !!");
            }
        })
    },


    
    // getwithdraw: function() {
    //     let usr_id =sessionStorage.getItem('usrname');
    //     const api_url ="http://localhost:5000/withdraw_crime/"+usr_id;
    //     data =this.getapi(api_url).then(data=>{
    //         console.log(data);
    //         for(var i = 0; i <= data.length; i++) {
    //             var a = "<tr  scope='row'><td>"+data[i].request_id+"</td><td>"+data[i].reported_id+"</td><td>"+data[i].request_time+"</td><td>"+data[i].request_date+"</td><td>"+data[i].request_reason+"</td><td><span class='material-icons' data-target='#changedata' onclick='with_display("+data[i].request_id+")'>unfold_more</span></td></tr>";

    //             tab_Content.innerHTML += a;
    //         }
    //     });
    // },


    getwithdraw: function() {
        let usr_id =sessionStorage.getItem('usrname');
        const api_url ="http://localhost:5000/withdraw_crime";
        data =this.getapi(api_url).then(data=>{
            for(var i = 0; i <= data.length; i++) {
                var a = "<tr  scope='row'><td>"+data[i].request_id+"</td><td>"+data[i].reported_id+"</td><td>"+data[i].f_name+"</td><td><span class='material-icons' data-target='#changedata' onclick='with_display("+data[i].request_id+")'>unfold_more</span></td></tr>";
                tab_Content.innerHTML += a;
            }
        });
    },

    //PoliceAuthenticateapi
    getpatwithdraw: function(i) {
        var x = document.getElementById("changeRecordForm");
        const api_url ="http://localhost:5000/withdraw_crime/"+i;
       
        // /* console.log(api_url);reported_id int primary key	auto_increment,
        
        data =this.getapi(api_url).then(data=>{
                x.elements[0].value = data[0].request_id,
                x.elements[1].value = data[0].reported_id,
                x.elements[2].value = data[0].request_time,
                x.elements[3].value = data[0].request_date,
                x.elements[4].value = data[0].request_reason
                $("#changedata").modal()
        });
    },

    deleterequest: function(){
        var xhr = new XMLHttpRequest();
        var data = JSON.stringify({
            "reported": 
                {
                    "user_id": document.getElementById("with_rep_id").value
                }
        });
        xhr.open("DELETE", "http://localhost:5000/delete/reported_crime", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(data);
        xhr.send(data);

    },


    getapi:async function(url) {
        
        // Storing response
        const response = await fetch(url);
        // Storing data in form of JSON
        var data = await response.json();
        // console.log(data);
        return data;
    }


}
