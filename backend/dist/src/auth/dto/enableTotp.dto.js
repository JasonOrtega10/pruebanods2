"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableTotpDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../../user/dto/user.dto");
class EnableTotpDTO extends (0, swagger_1.PickType)(user_dto_1.UserDTO, ["password"]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.EnableTotpDTO = EnableTotpDTO;
//# sourceMappingURL=enableTotp.dto.js.map