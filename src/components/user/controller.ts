import { Router } from 'express';

import { UserService } from './service.js';

const router = Router();
const service = new UserService();

router.get('/', async (req, res) => {
        try{
            console.log(req.body);
            const response = await service.getAll();
            res.json(response);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }
);

router.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const response = await service.getById(parseInt(req.params.id));
        if(response === undefined) throw new Error("Not found");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        if(req.body.name === undefined) throw new Error("Name is required");
        console.log(req.body);
        const response = await service.create(req.body.name);
        if(response === undefined) throw new Error("Server Error");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if(req.body.name === undefined) throw new Error("Name is required");
        console.log(req.params.id, req.body);
        const response = await service.update(parseInt(req.params.id), req.body.name);
        if(response === undefined) throw new Error("Not found");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const response = await service.delete(parseInt(req.params.id));
        if(response === undefined) throw new Error("Not found");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});


export default router;