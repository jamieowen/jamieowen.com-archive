
import Transition from '../components/Transition';

export default ( props )=>{

    return (
        <section>
        
            <Transition>
                <div>
                    <h1 className="fnt-smallest color-secondary">Biography</h1>

                </div>
            </Transition>

            <Transition>
                <p className="fnt-regular">
                    He has worked with a number of programming languages and environments over the years. With present focus being on front-end web and cross-platform technologies using Javascript ES6, WebGL/GLSL, Three.js, Pixi.js, React & Apache Cordova.  He is confident working in any language if necessary and ultimately believes in applying solid engineering & language agnostic practices to any technical environment regardless of current hype & framework trends.
                </p>                
            </Transition>

            <div className="break-2"/>

            <Transition>
                <p className="fnt-regular">
                    Overall, he has a preference for the creative, interactive & visual application of digital technology and loves creating highly polished digital products & experiences.  He spends a lot of time continuously learning & evolving his skills in 2d/3d graphics programming, optimized rendering techniques, virtual/augmented reality, procedural animation, data visualisation and generative design.
                </p>                                 
            </Transition>

        </section>

    )
}