import React from 'react';

import '@styles-components/NewView.scss';
import ive from '@img/ive.jpeg';

const NewView = () => {
  return(
    <section className="new">
      <div className="new__img">
        <img src={ive} alt="IVE"/>
      </div>
      <div className="new__title">
        <h1>El nuevo girl-group de Starship IVE ha debutado</h1>
      </div>
      <div className="new__label">
        <p>Girl Group</p>
        <span>1 diciembre 2021</span>
      </div>
      <div className="new__content">
        <p>¡El nuevo grupo femenino de Starship Entertainment, IVE, ha hecho su debut con su primer álbum sencillo “ELEVEN”!</p>
        <p>El grupo consta de seis miembros: Yujin (An Yu Jin), Rei, Leeseo, Liz, Gaeul y Wonyoung (Jang Won Young). Yujin y Wonyoung solían ser miembros del grupo de proyecto temporal IZ*ONE, que se formó a través de “Produce 48” de Mnet en 2018.</p>        
        <p>La canción principal de debut de IVE, “ELEVEN”, es una canción dance pop que amplifica los misteriosos encantos de las seis miembros. La letra describe la forma en que el corazón de una chica enamorada se tiñe de colores místicos, y aunque la canción es en su mayoría minimalista, los ritmos en constante variación hacen que la escucha sea divertida.</p>
        <p>¡Mira el cautivador vídeo musical de “ELEVEN” a continuación!</p>
        <div>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/--FmExEAsM8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      <div className="new__source">
        <h4>Fuente:</h4>
        <p>De los deseos</p>
      </div>
    </section>
  );
}

export default NewView;