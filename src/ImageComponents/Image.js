import koljadnyk from '../assets/images/original-235.jpg';
import cerkva from '../assets/images/cerkva.jpg';
import bogorodyca from '../assets/images/foto-bogorodyczya.jpg';
import bog from '../assets/images/god.jpg';
import hrystos from '../assets/images/hrystos.jpg';
import himn from '../assets/images/hymn.jpg';
import povstanski from '../assets/images/povstanski.jpg';
import strasni from '../assets/images/strasni.jpg';
import narodni from '../assets/images/images.jpg';
import voskresni from '../assets/images/завантаження.jpg';
import shchedrivky from '../assets/images/shchedrivky.jpg';
import vinshuvannja from '../assets/images/vinsha.jpg';
import pohoronni from '../assets/images/pohoronni.jpg'


export const Koljadimg = ({ className = 'image' }) => {
    return <img src={koljadnyk} alt="koljadFoto" className={className} />
};

export const Cerkvaimg = ({ className = 'image' }) => {
    return <img src={cerkva} alt='cerkvaFoto' className={className} />
};

export const Bogorodimg = ({ className = 'image' }) => {
    return <img src={bogorodyca} alt='bogoroducjaFoto' className={className} />
}; 

export const Bogimg = ({ className = 'image' }) => {
    return <img src={bog} alt='bogFoto' className={className} />
};

export const Hrystosimg = ({ className = 'image' }) => {
    return <img src={hrystos} alt='hrystosFoto' className={className} />
};

export const Himnimg = ({ className = 'image' }) => {
    return <img src={himn} alt='himnFoto' className={className} />
};

export const Povstanskiimg = ({ className = 'image' }) => {
    return <img src={povstanski} alt='povstanskiFoto' className={className} />
};

export const Strasniimg = ({ className = 'image' }) => {
    return <img src={strasni} alt='strasniFoto' className={className} />
};

export const Narodniimg = ({ className = 'image' }) => {
    return <img src={narodni} alt='narodniFoto' className={className} />
};

export const Voskresniimg = ({ className = 'image' }) => {
    return <img src={voskresni} alt='voskresniFoto' className={className} />
};

export const Shchedrivkyimg = ({ className = 'image' }) => {
    return <img src={shchedrivky} alt='shchedrivkyFoto' className={className} />
};

export const Vinshivkyimg = ({ className = 'image' }) => {
    return <img src={vinshuvannja} alt='vinshivkaFoto' className={className} />
};

export const Pohoronimg = ({ className = 'image' }) => {
    return <img src={pohoronni} alt='pohoronniFoto' className={className} />
};