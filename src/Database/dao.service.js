"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAOService = void 0;
class DAOService {
    constructor(model) {
        this.getAllRecords = async (page, limit, sort, sortBy, condition, joins, fields) => {
            try {
                page = page !== undefined ? page : 1;
                limit = limit !== undefined ? limit : 8;
                const start = (parseInt(page) - 1) * parseInt(limit);
                const end = parseInt(limit);
                let config = { offset: start, limit: end };
                let countConfig = {};
                if (sort) {
                    sortBy = sortBy ? sortBy : 'ASC';
                    config = {
                        ...config,
                        order: [[sortBy, sort]],
                    };
                }
                if (fields && fields.length) {
                    config = { ...config, attributes: fields.split(',') };
                }
                if (joins) {
                    config = { ...config, ...joins };
                    countConfig = { ...countConfig, ...joins };
                }
                if (condition) {
                    config = { ...config, where: condition };
                    countConfig = { ...countConfig, where: condition };
                }
                console.log(`Config data ====> ${JSON.stringify(config)}`);
                const totalCount = await this.model.count(countConfig);
                const records = await this.model.findAll(config);
                const result = {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    records,
                    totalCount,
                };
                if (records) {
                    return { success: true, data: result };
                }
            }
            catch (e) {
                throw e;
            }
        };
        this.getRecordById = async (id) => {
            try {
                if (id) {
                    const record = await this.model.findOne({ where: { id: id } });
                    if (record !== null) {
                        return { success: true, data: record };
                    }
                }
                else {
                    return { success: false };
                }
                return { success: false };
            }
            catch (e) {
                throw e;
            }
        };
        this.getRecordsByCondition = async (condition, joins) => {
            try {
                if (condition) {
                    const record = await this.model.findAll({ where: condition, ...joins });
                    if (record !== null) {
                        return { success: true, data: record };
                    }
                }
                else {
                    return { success: false };
                }
                return { success: false };
            }
            catch (e) {
                throw e;
            }
        };
        this.getRecordByCondition = async (condition, joins, sort, sortBy) => {
            try {
                if (condition) {
                    let config = { where: condition };
                    if (joins) {
                        config = { ...config, ...joins };
                    }
                    if (sort) {
                        sortBy = sortBy ? sortBy : 'ASC';
                        config = {
                            ...config,
                            order: [[sort, sortBy]],
                        };
                    }
                    const record = await this.model.findOne(config);
                    if (record !== null) {
                        return { success: true, data: record };
                    }
                }
                else {
                    return { success: false };
                }
                return { success: false };
            }
            catch (e) {
                throw e;
            }
        };
        this.createRecord = async (recordData) => {
            try {
                const record = await this.model.create(recordData);
                if (record !== null) {
                    return { success: true, data: record };
                }
                else {
                    return { success: false };
                }
            }
            catch (e) {
                throw e;
            }
        };
        this.createRecords = async (recordsData) => {
            try {
                const records = await this.model.bulkCreate(recordsData);
                if (records !== null) {
                    return { success: true, data: records };
                }
                else {
                    return { success: false };
                }
            }
            catch (e) {
                throw e;
            }
        };
        this.updateRecordById = async (id, updatedData) => {
            try {
                if (id && updatedData) {
                    const record = await this.model.update(updatedData, {
                        where: { id: id },
                    });
                    if (record !== null) {
                        return { success: true, data: record };
                    }
                }
                else {
                    return { success: false };
                }
                return { success: false };
            }
            catch (e) {
                throw e;
            }
        };
        this.updateRecordByCondition = async (updatedData, condition) => {
            try {
                if (updatedData && condition) {
                    const record = await this.model.update(updatedData, {
                        where: condition,
                    });
                    if (record !== null) {
                        return { success: true, data: record };
                    }
                }
                else {
                    return { success: false };
                }
                return { success: false };
            }
            catch (e) {
                throw e;
            }
        };
        this.deleteRecordById = async (id) => {
            try {
                if (id) {
                    const record = await this.model.destroy({ where: { id: id } });
                    if (record !== null) {
                        return { success: true };
                    }
                }
                return { success: false };
            }
            catch (e) {
                throw e;
            }
        };
        this.model = model;
    }
    setModel(model) {
        this.model = model;
    }
}
exports.DAOService = DAOService;
//# sourceMappingURL=dao.service.js.map