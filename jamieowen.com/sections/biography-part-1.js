
import Transition from '../components/Transition';

export default ( props )=>{

    return (
        <section>
            
            <Transition>
                
                    <h1 className="fnt-smallest color-secondary">Biography</h1>
                    {/* <p>1 / 2</p>                     */}
                
            </Transition>                      
            

            <Transition>
                <p className="fnt-regular">
                    Jamie is an independent Creative Technologist and Front-end Software Engineer with 15 years experience developing award-winning 2D & 3D interactive experiences and software applications for web, mobile & installations.  He works with some of the best creative agencies and largest brands in the industry; working well with designers, project managers & clients to see small, medium and enterprise scale applications through from start to finish. 
                </p>
            </Transition>

            <div className="break-2"/>

            <Transition>
                <p className="fnt-regular">
                    His work has varied from cross-platform iOS/Android applications achieving 3 million+ downloads for PBS Kids & Goodboy Digital.  3D installations and product development for Google & Rehabstudio. Web-based, enterprise scale digital signage applications in the banking industry; and rendering 3D Google Tilt Brush VR artwork in the web browser for Nexus Interactive Arts.
                </p>    
            </Transition>
            
        </section>

    )
}