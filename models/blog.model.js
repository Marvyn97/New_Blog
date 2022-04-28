import pool from "../config/database/db.js";

class Blog {
    constructor(id, nickname, content, sql){
        this.id = id;
        this.nickname = nickname;
        this.content = content;
        this.sql = sql;
    }

    static async getAllPosts() {
        const sql = "SELECT post.Id, Title, Contents, author.Firstname, author.LastName, CreationTimestamp, Author_Id FROM post JOIN author ON post.Author_Id = author.Id ORDER BY CreationTimestamp DESC";
        const query = await pool.execute(sql);
        return query;
    }
}
