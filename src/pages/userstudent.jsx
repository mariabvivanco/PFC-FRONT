import React, { Component, useEffect } from 'react';
import $ from 'jquery'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "../styles/userstudent.css"
import FilterUser from '../components/pure/forms/filterUser';



const Userstudent = () => {
       useEffect(() =>{
        var table = $('#tabla').DataTable({  paging: false,  info:false,
            dom: '<"search"><t>',
                language: {
                search: "Alumnos", //To remove Search Label _INPUT_
                searchPlaceholder: "Buscar por nombre email o palabra clave."
                
        }
        });
        $('#search').on( 'keyup', function () {
            table.search( this.value ).draw();
             } );
       }, [])
    
        return (
            
            
            <div>
                <body className="user" >
                    <div class="row" id="firstrow">
                        <div class="col col-sm-10" id="title">
                            <h3>OpenBootcamp<a id="student">|Alumnos</a> </h3>
                        </div>
                        <div class="col col-sm-2" id="user">
                            <select name="username" id="username" value="UserName"  >
                                <option id="user">UserName</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" id="restrow">
                        <div class="col col-sm-10" id="data">
                            <div class="row" id="search_and_add">
                                <div class="col col-sm-10" id="search">
                                    <a>Alumnos</a>   
                                    
                                      
                                    <input type="search" name="search" id="search" placeholder="&#xf002; Buscar por nombre email o palabra clave"></input>
                                    

                                </div>
                                <div class="col col-sm-2" >
                                        <button id="add">+ Añadir Alumnos</button>
                                    
                                </div>

                            </div>
                            <div class="row">
                                <div class id="table">
                                <table id="tabla" class="table table-responsive">
                                    <thead>
                                         <tr>
                                            <th scope="col">Nombre  </th>
                                            <th scope="col">Ciudad </th>
                                            <th scope="col">País </th>
                                            <th scope="col">Teléfono </th>
                                            <th scope="col">Correo Electrónico </th>
                                            <th scope="col">Etiquetas </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td >Leonardo Valdes Amaya</td>
                                            <td>Madrid</td>
                                            <td>España</td>
                                            <td>641400005</td>
                                            <td>leonardo.valdes@gmail.com</td>
                                            <td >
                                                <span id="tags" >Python</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">React</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Greidy Valdes Vivanco</td>
                                            <td>Madrid</td>
                                            <td>España</td>
                                            <td>641400009</td>
                                            <td>greidy.valdes@gmail.com</td>
                                            <td >
                                                <span id="tags" >Python</span>
                                                <span id="tags">Ruby</span>
                                                <span id="tags">React</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Ariel Bazan Rey</td>
                                            <td>Madrid</td>
                                            <td>España</td>
                                            <td>641400000</td>
                                            <td>ariel.bazan@gmail.com</td>
                                            <td >
                                                <span id="tags" >React</span>
                                                <span id="tags">Angular</span>
                                                <span id="tags">Python</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Beatriz valdez Perez</td>
                                            <td>Santa Clara</td>
                                            <td>Cuba</td>
                                            <td>5342346768</td>
                                            <td>beatriz.valdez@gmail.com</td>
                                            <td >
                                                <span id="tags" >Spring</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">React</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Leonardo Bode Caceres</td>
                                            <td>Barcelona</td>
                                            <td>España</td>
                                            <td>6414000034</td>
                                            <td>leonardo.bode@gmail.com</td>
                                            <td >
                                                <span id="tags" >Spring</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">PHP</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Roberto Hernandez vaaldes</td>
                                            <td>Valencia</td>
                                            <td>España</td>
                                            <td>641400089</td>
                                            <td>roberto.hernandez@gmail.com</td>
                                            <td >
                                                <span id="tags" >PHP</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">Scala</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Arlenis Ching Perez</td>
                                            <td>Valencia</td>
                                            <td>España</td>
                                            <td>641400000</td>
                                            <td>arlenis.ching@gmail.com</td>
                                            <td >
                                                <span id="tags" >Python</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">PHP</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Ramiro Rodriguez Pajares</td>
                                            <td>Habana</td>
                                            <td>Cuba</td>
                                            <td>5345672345</td>
                                            <td>ramiro.rodriguez@gmail.com</td>
                                            <td >
                                                <span id="tags" >Spring</span>
                                                <span id="tags">Java</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Maylid Díaz Medina</td>
                                            <td>Santiago de Chile</td>
                                            <td>Chile</td>
                                            <td>641400000</td>
                                            <td>maylid.diaz@gmail.com</td>
                                            <td >
                                                <span id="tags" >Spring</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">React</span>
                                                <span id="tags">AWS</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Leandro Bode Caceres</td>
                                            <td>Barcelona</td>
                                            <td>España</td>
                                            <td>6414540034</td>
                                            <td>leandro.bode@gmail.com</td>
                                            <td >
                                                <span id="tags" >Spring</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">PHP</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Roberto Vivanco Gómez</td>
                                            <td>Valencia</td>
                                            <td>España</td>
                                            <td>641424089</td>
                                            <td>roberto.vivanco@gmail.com</td>
                                            <td >
                                                <span id="tags" >PHP</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">Scala</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Aimme Arencibia Perez</td>
                                            <td>Valencia</td>
                                            <td>España</td>
                                            <td>641400024</td>
                                            <td>aimee.arencibiao@gmail.com</td>
                                            <td >
                                                <span id="tags" >Python</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">PHP</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Reinier Diaz Chavez</td>
                                            <td>Habana</td>
                                            <td>Cuba</td>
                                            <td>5345672375</td>
                                            <td>reinier.diaz@gmail.com</td>
                                            <td >
                                                <span id="tags" >Spring</span>
                                                <span id="tags">Java</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >Eddy Brito Díaz</td>
                                            <td>Santiago de Chile</td>
                                            <td>Chile</td>
                                            <td>641400089</td>
                                            <td>eddy.diaz@gmail.com</td>
                                            <td >
                                                <span id="tags" >Spring</span>
                                                <span id="tags">Java</span>
                                                <span id="tags">React</span>
                                                <span id="tags">AWS</span>
                                            </td>
                                            </tr>
                                    </tbody>
                                </table>
                                </div>    
                            </div>

                        </div>
                        <div class="col col-sm-2" id="filter">
                            <FilterUser></FilterUser>
                            
                        </div>
                        
                    </div>
                   
                </body>
            </div>
        );
    }

    


export default Userstudent;
