const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.get("/villages", async (req, res) => {

    try {

        const search = req.query.name || "";

        const page = parseInt(req.query.page) || 1;

        const limit = 20;

        const skip = (page - 1) * limit;

        const villages = await prisma.villages.findMany({

            where: {
                village_name: {
                    contains: search,
                    mode: "insensitive"
                }
            },

            skip: skip,

            take: limit

        });

        res.json(villages);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Server Error"
        });
    }
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});