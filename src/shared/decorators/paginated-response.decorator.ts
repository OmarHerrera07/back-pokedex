import { applyDecorators, Type } from "@nestjs/common";
import { PaginatedResponseDto } from "../dto/paginated-response.dto";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export function ApiPaginatedResponse<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(PaginatedResponseDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
}