/** @flow */
import {ACTION_LIST_ITEM_VISIT} from "../Constants"


export type Action = {
  type: string,
  id: string,
}

export const visitItem = (id: string): Action => {
  return {
    type: ACTION_LIST_ITEM_VISIT,
    id: id,
  }
};
