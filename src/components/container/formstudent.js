import FormStudent from "../pure/forms/formStudent";

<div id="form-add">
        <div id="body" >
            <div class="row" >
                <div class="col-11" id="title">
                    <label>Nuevo Alumno</label>
                </div>
                <div class="col-1">
                    <label id="x">X</label>
                </div>
            </div>
            <div class="row">
                <div class="col-6" id="datastudent">
                    <label class="label" >Nombre y Apellidos</label>
                    <input name="studentname" id="entry" type="text" placeholder="Nombre Alumno"  />
                    
                    <div class="row">
                        <div class="col-6">
                            <div class="row" >
                                <label class="label" >
                                    País
                                </label>
                            </div>
                            <select class="entry" id="countryname" >
                                <option value="" disabled selected hidden>Elija País</option>
                                <option>España</option>
                                <option>Cuba</option>
                                <option>Estados Unidos</option>
                            </select>
                            <label  class="label">No Teléfono</label>
                            <input class="entry" type="phone"/>
                            <label  class="label">Presencialidad</label>
                            <select class="entry">
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
                                <select class="entry" id="countryname" >
                                    <option value="" disabled selected hidden>Elija Ciudad</option>
                                    <option>Madrid</option>
                                    <option>Valencia</option>
                                    <option>La Habana</option>
                                    <option>Nueva Yotk</option>
                                </select>
                                <label  class="label">Email</label>
                                <input class="entry" type="email"/>
                                <label  class="label">Traslado</label>
                                <select class="entry">
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
                    <input name="photo" id="photo" class="entry" type="text" placeholder="&#xf03e;  NombreArchivo.png"  />
                    <label>Documento CV</label>
                    <input name="pdf" id="pdf" class="entry" type="text" placeholder="&#xf1c1;  NombreArchivo.pdf"  />
                    <label>Etiquetas</label>
                    
                    <input ref={inputRef} id="tagname" type="text" class="entry" list="tagslist" placeholder="Escriba para buscar" onChange={()=> {addTag(inputRef.current.value)}}/>
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
            
            <div class="row" id="buttons">
                <div class="col-6">
                    
                </div>
                <div class="col-6">
                    <div class = "row">
                        <div class="col-8">
                        </div>
                        <div class="col-2">
                            <button type="button" id="save" class="btn btn-primary">Guardar</button>
                        </div>
                        <div class="col-2">
                            <button type="button" id="discart" class="btn btn-primary">Cancelar</button>                                
                        </div>                        
                    </div>                 
                    
                </div>
               
                
                

            </div>
    
        </div>
      </div>