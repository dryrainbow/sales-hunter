import {EntityRepository, In, Repository} from "typeorm";
import {Category} from "../entity/Category";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async getBySlugs(slugs: string[]) {
        return await this.find({
            where: {
                slug: In(slugs)
            }
        })
    }

    async createOrUpdateCategories(slugsToNames: Record<string, string>) {
        const slugs = Object.keys(slugsToNames)
        const existingCategories = await this.getBySlugs(slugs)

        if(existingCategories.length === slugs.length) {
            return existingCategories
        }
        const existingSlugs = existingCategories.map(cat=>cat.slug)
        const notExistingSlugs = slugs.filter(slug=>!existingSlugs.includes(slug))
        const newCategories: Category[] = []
        notExistingSlugs.forEach((slug: string)=>{
            const newCategory = new Category()
            newCategory.name = slugsToNames[slug]
            newCategory.slug = slug
            if(newCategory.name && newCategory.slug) {
                newCategories.push(newCategory)
            }
        })
        console.log(newCategories)

        await this.save(newCategories)
        return [...existingCategories, ...newCategories]
    }
}
