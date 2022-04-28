import React from 'react'
import './Modal.css'

const Modal = ({closeModal}) => {
    return (
       <>
            <div>
                           <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                             <div className="modal-dialog modal-dialog-scrollable">
                               <div className="modal-content">
                                 <div className="modal-header">
                                   <h5 className="modal-title" id="exampleModalLabel">Covid Symptoms</h5>
                                   <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() =>{
                                       closeModal(false)
                                   }}>
                                     <span aria-hidden="true">&times;</span>
                                   </button>
                                 </div>
                                 <div className="modal-body">
                                   <div className="card mb-3 covid-symptoms-card">
                                     <div className="covid-card-images">
                                       <div>
                                         <img src="https://www.gstatic.com/healthricherkp/covidsymptoms/light_fever.gif" className="card-img" height="70" width="55" alt="..."/>
                                         <h5 id="fever">Fever</h5>
                                       </div>
                                       <div>
                                         <img src="https://www.gstatic.com/healthricherkp/covidsymptoms/light_cough.gif" className="card-img" height="70" width="55" alt="..."/>
                                         <h5>Dry cough</h5>
                                       </div>
                                       <div>
                                         <img src="https://www.gstatic.com/healthricherkp/covidsymptoms/light_tiredness.gif" className="card-img" height="70" width="55" alt="..."/>
                                         <h5>Tiredness</h5>
                                       </div>
                                     </div>
                                     <div className="card-body">
                                       <h5 className="card-title">Covid Symptoms</h5>
                                       <p className="card-text">COVID-19 affects different people in different ways. Most infected people will develop mild to moderate illness and recover without hospitalization.</p>
                                       <p className="card-text symptoms"><small className="text-muted">Most common symptoms:</small></p>
                                         <ul className="text-muted">
                                           <li>fever</li>
                                           <li>dry cough</li>
                                           <li>tiredness</li>
                                         </ul>
                                       <p className="card-text symptoms"><small className="text-muted">Less common symptoms:</small></p>
                                         <ul className="text-muted">
                                           <li>aches and pains</li>
                                           <li>sore throat</li>
                                           <li>headache</li>
                                           <li>a rash on skin, or discolouration of fingers or toes</li>
                                         </ul>
                                       <p className="card-text symptoms"><small className="text-muted">Serious symptoms:</small></p>
                                         <ul className="text-muted">
                                           <li>difficulty breathing or shortness of breath</li>
                                           <li>chest pain or pressure</li>
                                           <li>loss of speech or movement</li>
                                         </ul>
                                       <p className="card-text">Seek immediate medical attention if you have serious symptoms. Always call before visiting your doctor or health facility.</p>
                                       <p className="card-text">People with mild symptoms who are otherwise healthy should manage their symptoms at home.</p>
                                       <p className="card-text">On average it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days.</p>
                                     </div>
                                   </div>
                                 </div>
                                 <div className="modal-footer">
                                   <button type="button" className="btn btn-primary" data-dismiss="modal">Understood</button>
                                 </div>
                               </div>
                             </div>
                           </div>
     
                  </div>
       </>
       
    )
}

export default Modal
