const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST Application
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const app = await prisma.application.create({
            data: {
                systemType: data.systemType,
                plannedCommission: new Date(data.plannedCommission),
                sitePlanAttached: data.sitePlanAttached,
                dataSheetAttached: data.dataSheetAttached,
                certificatesAttached: data.certificatesAttached,
                subscriber: {
                    create: data.subscriber
                },
                operator: {
                    create: data.operator
                },
                installer: {
                    create: data.installer
                },
                plantAddress: {
                    create: data.plantAddress
                }
            }
        });
        res.json(app);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something broke');
    }
});

// PUT an application by ID
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    try {
        const existingApp = await prisma.application.findUnique({ where: { id } });
        if (!existingApp) {
            return res.status(404).json({ error: 'Application not found' });
        }

        const updatedApp = await prisma.application.update({
            where: { id },
            data: {
                systemType: data.systemType,
                plannedCommission: new Date(data.plannedCommission),
                sitePlanAttached: data.sitePlanAttached,
                dataSheetAttached: data.dataSheetAttached,
                certificatesAttached: data.certificatesAttached
            },
            include: {
                subscriber: true,
                operator: true,
                installer: true,
                plantAddress: true
            }
        });

        res.json(updatedApp);
    } catch (err) {
        console.error('🔥 Error updating application:', err);
        res.status(500).json({ error: 'Could not update application' });
    }
});


// GET all applications
router.get('/', async (req, res) => {
    try {
        const apps = await prisma.application.findMany({
            include: {
                subscriber: true,
                operator: true,
                installer: true,
                plantAddress: true
            }
        });
        res.json(apps);
    } catch (err) {
        console.error('🔥 Error fetching applications:', err);
        res.status(500).json({ error: 'Could not fetch applications' });
    }
});

// GET applications via ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const app = await prisma.application.findUnique({
            where: { id },
            include: {
                subscriber: true,
                operator: true,
                installer: true,
                plantAddress: true
            }
        });

        if (!app) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.json(app);
    } catch (err) {
        console.error('🔥 Error fetching application:', err);
        res.status(500).json({ error: 'Could not fetch application' });
    }
});

// DELETE one application by ID
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        // Check if app exists first
        const app = await prisma.application.findUnique({ where: { id } });

        if (!app) {
            return res.status(404).json({ error: 'Application not found' });
        }

        await prisma.application.delete({ where: { id } });

        res.json({ message: `Application ${id} deleted successfully.` });
    } catch (err) {
        console.error('🔥 Error deleting application:', err);
        res.status(500).json({ error: 'Could not delete application' });
    }
});



module.exports = router;
