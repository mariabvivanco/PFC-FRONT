import FormStudent from "../pure/forms/formStudent";

function showname() {
    
    var name = document.getElementById("studentname").value;
    document.getElementById("lbStudentName").innerHTML=name;
    
  }
  function showcity() {
    
    var name = document.getElementById("cityname").value;
    document.getElementById("lbCityName").innerHTML=name;
    
  }

  function showcountry() {
    
    var name = document.getElementById("countryname").value;
    document.getElementById("lbCountryName").innerHTML=name;
    
  }



  var tags = []
  var listtagstemp= []
  var i=0

 /* function addTag(){
    var elems = document.getElementsByTagName( "option" );
    var arr = jQuery.makeArray( elems );
    for( i=0; i<arr.length;i++){
      if (arr[i].className=="tagpos"){
        listtagstemp.push(arr[i].innerText);
      }
    }
    var tag = document.getElementById("tagname").value; 
    var repeat = false;

    for(i=0;i<tags.length;i++){
      if(tags[i]==tag)
        repeat=true;
    }
    
    for (i=0;i<listtagstemp.length;i++){
      if((tag==listtagstemp[i])&&(!(repeat))){
        tags.push(tag);
        break;
      }
      
    }
    
    paintTags()
    
  }

  function deleteTag(name){
    for (i=0; i<tags.length;i++){
      if ((tags[i]+" X")==name){
        tags.splice(i,1);
        break;
      }
    }       
   paintTags()
    
  }

  function paintTags(){
    document.getElementById("tags").innerHTML = "";
    
    for(i = 0;i<tags.length;i++){

      var btn = document.createElement('input');
      btn.setAttribute("id", tags[i]+" X");
      btn.type = "button";
      btn.setAttribute("value",tags[i]+" X");
      btn.setAttribute("name",tags[i]+" X");
      btn.setAttribute("class", "tagstec")
      btn.addEventListener('click', function(){
          deleteTag(this.value);
        });
      document.getElementById("tags").appendChild(btn);
    }

  }*/


