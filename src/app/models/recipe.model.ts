export class Recipe {
    title: string;
    image_url: string;
    source_url: string;

    public constructor(init?:Partial<Recipe>) {
        Object.assign(this, init);
    }
}