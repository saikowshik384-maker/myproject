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

app.get("/states", async (req, res) => {

    try {

        const states = await prisma.villages.findMany({

            distinct: ['state_name'],

            select: {
                state_name: true
            }

        });

        res.json(states);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Server Error"
        });
    }
});

app.get("/districts", async (req, res) => {

    try {

        const state = req.query.state || "";

        const districts = await prisma.villages.findMany({

            where: {
                state_name: state
            },

            distinct: ['district_name'],

            select: {
                district_name: true
            }

        });

        res.json(districts);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Server Error"
        });
    }
});

app.get("/subdistricts", async (req, res) => {

    try {

        const district = req.query.district || "";

        const subdistricts = await prisma.villages.findMany({

            where: {
                district_name: district
            },

            distinct: ['subdistrict_name'],

            select: {
                subdistrict_name: true
            }

        });

        res.json(subdistricts);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Server Error"
        });
    }
});
app.get("/villagelist", async (req, res) => {

    try {

        const subdistrict = req.query.subdistrict || "";

        const villages = await prisma.villages.findMany({

            where: {
                subdistrict_name: subdistrict
            },

            distinct: ['village_name'],

            select: {
                village_name: true
            }

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