
import Transition from '../components/Transition';

export default (props)=>{

    return (        
        <section>

                
                <div>
                    
                    <Transition>
                        <div className="fnt-smallest fnt-heavy color-secondary hide-op">Hello World</div>
                    </Transition>

                    <Transition>
                        <p className="fnt-large fnt-light color-content hide-op">

                            <em className="fnt-regular">Based in London, Jamie is a Lead Creative Technologist and Frontend Software Engineer;</em> focused on producing high quality 2D & 3D cross-platform applications for web, mobile & installations.

                        </p>
                    </Transition>
                </div>

            

        </section>
    )
    
}