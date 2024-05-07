import {ImageSource, Loader} from 'excalibur';

const Resources = {
    Mole: new ImageSource('images/mole.png'),
    DirtPile: new ImageSource('images/dirt-pile.png'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };