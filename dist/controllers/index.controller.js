"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    constructor() {
        this.index = (req, res) => {
            try {
                res.send('This is the truth of the universe');
            }
            catch (error) {
                throw error;
            }
        };
    }
}
exports.default = IndexController;
//# sourceMappingURL=index.controller.js.map