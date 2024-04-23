import { injectable } from "inversify";
import { ICategoryRepository } from "../interfaces/category/ICategoryRepository";
import { Category } from "../models/CategoryModel";
import { DB } from "../db/db.connection";
import { category } from "../db/schema";
import { eq } from "drizzle-orm";


@injectable()
export class CategoryRepository implements ICategoryRepository {


    async createCategory(record: Category): Promise<any> {
        const result = await DB.insert(category).values(record).execute();
        if (result) {
            return result;
        }
        throw new Error("Kategori oluşturulamadı.");

    }
    async deleteCategory(id: number): Promise<any> {
        const result = await DB.update(category).set({ isActive: false }).where(eq(category.id, id)).execute();
        if (result) {
            return result;
        }
        throw new Error("Kategori silinemedi.");
    }
    async getCategories(userId: number): Promise<any> {
        const result = await DB.select().from(category).where(eq(category.userId, userId)).execute();
        if (result) {
            return result;
        }
        throw new Error("Kategoriler getirilemedi.");
    }
    async getCategoryById(id: number): Promise<any> {
        const result = await DB.select().from(category).where(eq(category.id, id)).execute();
        if (result) {
            return result;
        }
        throw new Error("Kategori getirilemedi.");
    }
    async updateCategory(record: Category): Promise<any> {
        const result = await DB.update(category).set(record).where(eq(category.id, record.id)).execute();
        if (result) {
            return result;
        }
        throw new Error("Kategori güncellenemedi.");
    }
}