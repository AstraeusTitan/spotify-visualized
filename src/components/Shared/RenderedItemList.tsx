import { JsxElement } from "typescript";
import ItemList from "./ItemList";
import _ from "lodash";
import { ReactElement } from "react";

type Props = {
  dataList?: any[];
  itemComponent: (data?: any, index?: number) => any;
  placeholderCount?: number;
};
const RenderedItemList = ({
  dataList,
  itemComponent,
  placeholderCount = 5,
}: Props) => {
  const placeholderRange = _.range(0, placeholderCount);

  return (
    <ItemList>
      <>
        {dataList === undefined ? (
          <>{placeholderRange.map((i) => itemComponent(undefined, i))}</>
        ) : dataList?.length > 0 ? (
          dataList.map((data, i) => itemComponent(data, i))
        ) : (
          dataList.length === 0 && <div>Empty State</div>
        )}
      </>
    </ItemList>
  );
};

export default RenderedItemList;
