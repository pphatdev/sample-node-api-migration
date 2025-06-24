import { client } from "../db/configs/pg.config.js";
import { Response } from "../helpers/response-data.js";
import { Pagination } from "../helpers/paginations.js";
import multer from "multer";
import ip from "ip";
import ImageModel from "./images.js";
import { PORT, VERSION } from "../db/configs/index.js";

const PAGE = new Pagination()

export const getData = async (request) => {
    const { page, limit, search, sort, published } = request
    const count = await client.query(`SELECT count(id) from public.projects`)
    const total = count.rows[0].count || 0

    const query = PAGE.query({
        table: 'public.projects',
        selectColumns: [
            "id",
            "name",
            "description",
            "image",
            "published",
            "tags",
            "source::json as source",
            "authors::json as authors",
            "languages",
            "created_date", "updated_date"
        ],
        conditions: { operator: 'WHERE', value: `published = ${published ?? 'true'}` },
        page: page,
        limit: limit,
        search: {
            column: ["name", "description"],
            value: search,
            operator: "or",
            withWere: true
        },
        sort: {
            column: [],
            value: sort
        },
    })

    return await client.query(query, []).then(
        result => Response.success( result.rows, total)
    ).catch(
        reason => console.log(reason)
    )
};


export const getDataDetail = async ({ id }) => {
    return await client.query(
        `SELECT * from public.projects where id=$1`, [id]
    ).then(
        async result => Response.detailSuccess( result.rows )
    ).catch(
        reason => console.log(reason)
    )
};


export const insertData = async (request) => {

    const fileData = {
        id: (request.file.filename).split('.')[0],
        filename: request.file.filename,
        original_name: request.file.originalname,
        mime_type: request.file.mimetype,
        size: request.file.size,
        path: `/images/projects/${request.file.filename}`
    }

    request.body.image = fileData.path;

    const { status } = await ImageModel.insertData(fileData)

    if (status !== 200) {
        res.status(status).json(Response.insetFailed({ message: "Failed to insert image data." }));
    }

    const { image, title, description, published, tags, source, authors, languages } = request.body;

    const query = `
        INSERT INTO public.projects(
            name, description, image, published, tags, source, authors, languages
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id;
    `;

    const values = [
        title,
        description,
        image,
        published,
        tags ? (tags) : null,
        source ? JSON.stringify(source) : null,
        authors ? JSON.stringify(authors) : null,
        languages ? (languages) : null
    ];

    return await client.query(query, values).then(
        result => {
            if (result.rowCount > 0) {
                return Response.insetSuccess({
                    id: result.rows[0].id,
                    message: "Project created successfully.",
                });
            }
            return Response.insetFailed({ message: "Failed to create project." });
        }
    ).catch(
        reason => {
            console.log(reason);
            return Response.insetFailed({ message: reason.message || "Failed to create project." });
        }
    );
};


export const updateData = async (request) => {
    return await client.query(
        `UPDATE public.projects SET "name"=$1 WHERE id=$2;`,
        [name, id]
    ).then(
        result => {
            if (result.rowCount < 0)
                return result
            return Response.insetSuccess({ message: "Update Success." })
        }
    ).catch(
        reason => {
            if (reason.code == "23505")
                return Response.insetFailed({ message: reason.detail });

            console.log(reason)
            return reason
        }
    )
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const uploadSingle = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json(Response.insetFailed({ message: 'File too large. Maximum size is 5MB.' }));
            }
            return res.status(400).json(Response.insetFailed({ message: err.message }));
        } else if (err) {
            return res.status(400).json(Response.insetFailed({ message: err.message }));
        }
        next();
    });
}

export const create = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json(Response.insetFailed({ message: 'No file uploaded' }))
        }

        const fileData = {
            id: (req.file.filename).split('.')[0],
            filename: req.file.filename,
            original_name: req.file.originalname,
            mime_type: req.file.mimetype,
            size: req.file.size,
            path: `http://${ip.address()}:${PORT}/api/${VERSION}/files/image/${req.file.filename}`
        }

        return res.json(await insertData(fileData))

    } catch (error) {
        console.error('Upload error:', error)
        return res.status(500).json(
            Response.insetFailed({ message: 'Error uploading file' })
        )
    }
}