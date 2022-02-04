import {React, useState, useRef, useEffect} from 'react';
import {Students} from '../../../models/students'
import PropTypes from 'prop-types'
import UserStudent from '../../../pages/userstudent'

import "../../../styles/formAddStudent.css"
import { addStudent, changePassword } from '../../../services/loginService';


const FormAddStudent = ({studentNew,tagsOption,addStudentNew}) => {
    
    
    const listoption = new Array(tagsOption.map((option,key) =>  <option key={key} value={option}>{option}</option>))
    const countrylist =  ['Estados Unidos', 'Rusia', 'China', 'Alemania', 'Reino Unido', 'Francia','Canadá', 'Suiza', 
    'Australia', 'Turquía', 'Italia', 'España', 'Suiza','Bélgica', 'Brasil', 'Chile', 'Venezuela', 'Cuba', 'Argentina',
    'México', 'Uruguay', 'Paraguay']
    const countrysort=countrylist.sort()
    
    const countryoption = new Array(countrysort.map((option,key) =>  <option key={key} value={option}>{option}</option>))
    const pdfInit=true;
    const photoInit=true;  
    const cityRef = useRef();
    const countryRef = useRef();
    const presRef = useRef(null);
    const remoteRef = useRef(null);
    const traslateRef = useRef(null);
    const notransfRef = useRef(null);
    const pdfRef = useRef(null);
    const photoRef = useRef(null);

    const studentInit = {
        name: null,
        country: null,
        city:null,
        phoneNumber:null,
        email:null,
        presence:'Remote',
        transfer:false,
        skills:null,
        photo:null,
        document:null

    }
   
    const [tags, setTags] = useState([]);
    const [pdf, setPdf] = useState(pdfInit);
    const [pdfSelect, setPdfSelect] = useState(false);
    const [photoSelect, setPhotoSelect] = useState(false);
    const [photo, setPhoto] = useState(photoInit);
    const [student, setStudent] = useState(studentInit);
    const [valorPdf, setValorPdf] = useState("");
    const [valorPhoto, setValorPhoto] = useState("");
    const [load, setLoad] = useState(false);
    
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const nameRef = useRef();
    const listRef = useRef();
    const inputRef = useRef();

    function changePdf(file){
        const size = Math.round(document.getElementById('pdf').files[0].size/1024);
        var pdrs = document.getElementById('pdf').files[0].name+ "   " +size+"k";
        setPdfSelect(true)
        if (size>25480)
            {console.log('por tamaño')
            setValorPdf("El fichero tiene un tamaño mayor que el permitido")}
        else 
            if (document.getElementById('pdf').value.substr(document.getElementById('pdf').value.length-3)!=='pdf')
            { console.log("por tipo")
                setValorPdf("El fichero tiene que ser .pdf")
                
            }
            else{console.log("no se pq")
                setValorPdf(pdrs)}
                const studentTemp = student;
                studentTemp.document = file;
                setStudent(studentTemp)
                studentNew(studentTemp)
        }

        function changePhoto(photo){
            const size = Math.round(document.getElementById('photo').files[0].size/1024);
            var pdrs = document.getElementById('photo').files[0].name+ "   " +size+"k";
            setPhotoSelect(true)
            if (size>2548)
                {console.log('por tamaño')
                setValorPhoto("la imagen tiene un tamaño mayor que el permitido")}
            else 
                if ((document.getElementById('photo').value.substr(document.getElementById('photo').value.length-3)!=='png')&&
                    (document.getElementById('photo').value.substr(document.getElementById('photo').value.length-3)!=='jpg')&&
                    (document.getElementById('photo').value.substr(document.getElementById('photo').value.length-4)!=='jpeg'))
                        { console.log("por tipo")
                            setValorPhoto("la imagen tiene que ser .jpg o .png o .jpeg")
                            
                        }
                else{console.log("no se pq")
                    setValorPhoto(pdrs)}
                    const studentTemp = student;
                    studentTemp.photo = photo;
                    setStudent(studentTemp)
                    studentNew(studentTemp)
            }
    


    
    

    function deleteTag(tag){
        console.log('Detele this Tag:', tag);
        const index = tags.indexOf(tag);
        const tempTags = [...tags];
        tempTags.splice(index,1);
        setTags(tempTags);
        const studentTemp = student;
        studentTemp.skills = tempTags;
        setStudent(studentTemp)
        studentNew(studentTemp)
    }

    function addTag(tag){
        var duplic = false;
        var exist= false;


        for (var i=0; i<tagsOption.length&&!exist;i++){
            if (tagsOption[i]==tag)
                exist=true;

        }

        for (var i=0; i<tags.length&&!duplic;i++){
            if (tags[i]==tag)
                duplic=true;

        }

        if (exist&&!duplic){
            console.log('ADD this Task:', tag);
            const tempTags = [...tags];
            tempTags.push(tag);
            setTags(tempTags);
            inputRef.current.value="";
            return true;
        }

        return false;
    }

    function initComponent() {
        nameRef.current.value="";
        emailRef.current.value="";
        cityRef.current.value="";
        phoneNumberRef.current.value="";
        traslateRef.current.value="";
        presRef.current.value="";
        countryRef.current.value="";
        setTags([]);
        setPhotoSelect(false);
        setPdfSelect(false);
        
    }

        useEffect(() => {
           initComponent();
        },[load] );
        
    
    return (
        
        <div id="studentadd" className="modal" tabIndex="-1">
                    <div className="modal-dialog modal-xl" >
                        <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nuevo Alumno</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            
                          <div className="modal-body">
                            <div id="form-add">
                                <div id="body" >
                                    <div class="row">
                                        <div class="col-6" id="datastudent">
                                            <label class="label" >Nombre y Apellidos</label>
                                            <input name="studentname" id="entry" type="text" ref={nameRef}  placeholder="Ej: Juan Pérez Lorca"
                                            maxLength="30" minLength="4" pattern="^[a-zA-Z0-9_.-]*$"  required autoComplete="off"
                                            onChange={(event)=>{
                                                const studentTemp = student;
                                                studentTemp.name = event.target.value
                                                setStudent(studentTemp)
                                                studentNew(studentTemp)}}
                                            />
                                            
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="row" >
                                                        <label class="label" >
                                                            País
                                                        </label>
                                                    </div>
                                                    <select class="entry" id="countryname"  ref={countryRef}
                                                        onChange={()=>{
                                                            const studentTemp = student;
                                                            studentTemp.country = countryRef.current.value
                                                            setStudent(studentTemp)
                                                            studentNew(studentTemp)}}>
                                                        <option value="" disabled selected hidden>Elige un país</option>
                                                        {countryoption}
                                                    </select>

                                                    <label  class="label">No Teléfono</label>
                                                    <input class="entry" type="phone" placeholder='Ej: +34 612 34 56 78' ref={phoneNumberRef}
                                                    autoComplete="off"
                                                        onChange={(event)=>{
                                                            const studentTemp = student;
                                                            studentTemp.phoneNumber = event.target.value
                                                            setStudent(studentTemp)
                                                            studentNew(studentTemp)}}/>


                                                    <label  class="label" >Presencialidad</label>
                                                    <select class="entry" ref={presRef}
                                                        onChange={()=>{
                                                            const studentTemp = student;
                                                            function asignePresence () {
                                                                if (presRef.current.value===('Presencial'))
                                                                    {studentTemp.presence='Face_to_face'}
                                                                if (presRef.current.value===('En Remoto'))
                                                                    studentTemp.presence="Remote"
                                                                if (presRef.current.value===('Mixto'))
                                                                    studentTemp.presence="Mixed"

                                                            }
                                                            asignePresence()
                                                            setStudent(studentTemp)
                                                            studentNew(studentTemp)}}>
                                                        <option id="example" value="" disabled selected hidden >Elige una opción</option>
                                                        <option>Presencial</option>
                                                        <option>En Remoto</option>
                                                        <option>Mixto</option>
                                                    </select>
                                                
                                                </div>
                                                <div class="col-6">
                                                    <div class="row" >
                                                            <label class="label" >
                                                                Ciudad
                                                            </label>
                                                        </div>
                                                        <input name="studentcity" id="studentcity" type="text" ref={cityRef}  placeholder="Elige una ciudad"
                                                        autoComplete="off"
                                                            onChange={(event)=>{
                                                                const studentTemp = student;
                                                                studentTemp.city = event.target.value
                                                                setStudent(studentTemp)
                                                                studentNew(studentTemp)}}
                                            />
                                                        <label  class="label">Email</label>
                                                        <input class="entry" type="email" placeholder='Ej: user@mail.com' ref={emailRef}
                                                        onChange={event=>{
                                                                                            
                                                            const studentTemp = student;
                                                            studentTemp.email = event.target.value
                                                            setStudent(studentTemp)
                                                            studentNew(studentTemp)
                                                        }}/>
                                                        <label  class="label">Traslado</label>
                                                        <select id="select" class="entry" defaultValue=""  ref={traslateRef}
                                                            onChange={()=>{
                                                                const studentTemp = student;
                                                                function asigneTransfer () {
                                                                    if (traslateRef.current.value===('Si'))
                                                                        studentTemp.transfer=true
                                                                    else
                                                                        studentTemp.transfer=false
                                                                    
                                                                }
                                                                asigneTransfer()
                                                                setStudent(studentTemp)
                                                                studentNew(studentTemp)}}>
                                                            <option id="example" value=""  disabled selected hidden >Elige una opción</option>
                                                            <option>Si</option>
                                                            <option>No</option>                        
                                                        </select>
                                                    </div>
                                                </div>
                                            <div class="row" id="otherdata">
                                                <div class="col-6">

                                                </div>
                                                <div class="col-6">
                                                    
                                                </div>
                                                
                                            </div>


                                        </div>
                                        <div class="col-6" id="file-tag">
                                            <label>Foto de Perfil</label>
                                            {<div>
                                                    
                                                    {!photoSelect ? 
                                                    <div class='row'>
                                                            <div class="col-auto" >
                                                                <label class="custom-file-upload">
                                                                    <input name="photo" id="photo" class="entry" ref={photoRef} type="file" placeholder="&#xF0ee;Subir Imagen" 
                                                                        onChange={(e)=>{
                                                                            let photo = e.target.files[0];
                                                                            changePhoto(photo);}} />
                                                                    &#xF0ee;Subir Imagen
                                                                </label>
                                                            </div>
                                                            <div class="col-8">
                                                        <label><a id="light">Archivos soportados</a><a id="bold">.png .jpg .jpeg</a></label>
                                                        <label><a id="light">Tamaño archivo máximo:</a><a id="bold">2 MB</a></label>
                                                    </div>
                                                        </div>
                                                    :<div id="info" onClick={()=>{setPhotoSelect(false)}}>&#xf03e;{valorPhoto}</div>}
                                            </div>}
                                            <label>Documento CV</label>
                                        
                                            <div>
                                                
                                                    {!pdfSelect ? 
                                                    <div class='row'>
                                                        <div class="col-auto" >
                                                            <label class="custom-file-upload">
                                                                <input name="pdf" id="pdf" class="entry" ref={pdfRef} type="file" placeholder="&#xf1c1;  NombreArchivo.pdf" 
                                                                onChange={(e)=>{
                                                                    let file = e.target.files[0];
                                                                    changePdf(file);}} />
                                                                    &#xF0ee;Subir documento Pdf

                                                            </label>
                                                        </div>
                                                        <div class="col-6">
                                                            <label><a id="light">Archivos soportados</a><a id="bold">.pdf</a></label>
                                                            <label><a id="light">Tamaño archivo máximo:</a><a id="bold">20 MB</a></label>
                                                    </div>
                                                    </div>
                                                    :<div id="info" onClick={()=>{setPdfSelect(false)}}>&#xf1c1;{valorPdf}</div>}
                                                </div>
                                                
                                                
                                            

                                            <label>Etiquetas</label>
                                            
                                            <input ref={inputRef} id="tagname" type="text" class="entry" list="tagslist" placeholder="Escriba para buscar" 
                                                autoComplete="off"
                                                onChange={()=> {
                                                    const tagsTemp = tags;
                                                    const studentTemp = student;
                                                    studentTemp.skills = tagsTemp;
                                                    const valueSkill=inputRef.current.value;
                                                    function addOk(skill) {
                                                        if (addTag(inputRef.current.value))
                                                            studentTemp.skills.push(valueSkill)
                                                    }
                                                    addOk(valueSkill);
                                                    setStudent(studentTemp)
                                                    studentNew(studentTemp)}}/>
                                                <datalist ref={listRef} id="tagslist" >
                                                    {listoption}
                                                </datalist>
                                            
                                                    
                                            <div class="contenido">
                                                <div class="col-12">
                                                <a id="tags"></a>

                                                    { tags.map((tag, index) => {
                                                        return (
                                                            <button                                 
                                                                value={tag}
                                                                name={tag}
                                                                id="tag" onClick={()=> {deleteTag(tag)}}>
                                                                    {tag}  X
                                                            </button>
                                                        )
                                                    })}
                                            </div>
                                            
                                        </div>

                                    </div>
                                    
                                    </div>
                                    
                                        
                                </div>
                            </div>

                           </div>
                           
                           <div className="modal-footer">
                                
                                <button id="save" type="button" className="btn btn-primary"
                                         onClick={()=>{addStudentNew(); setLoad(!load)
                                          } } >Guardar</button>
                                <button id="discard" type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                onClick={()=>setLoad(!load)}

                                    >Cancelar</button>
                            </div>
         
                                
                        </div>
                        
                      </div>
                    </div>
                                    
       
        
    );
}



export default FormAddStudent;
