
import { AiOutlineCheck } from "react-icons/ai";
import { useCallback, useEffect, useState , useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import image from "../assets/test.webp";
import image2 from "../assets/test2.webp";
import { InputText } from "primereact/inputtext";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCartApi,
  GetToCart,
  getProduct,
  getProductSummery,
} from "../store/ContactSlice";
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import SwiperProducts from "../components/SwiperProducts/SwiperProducts";
import Helmet from "../components/Helmet";
import { Toast } from 'primereact/toast';

const TestProduct = ({ isUser }) => {
  const { id, id2 } = useParams();
  const [value, setValue] = useState(false);
  const { productArr, summeryArr } = useSelector((state) => state.ContactSlice);
  console.log("productArr" , productArr)

  const dispatch = useDispatch();

  const [widthError, setWidthError] = useState(false);
  const [heightError, setheightError] = useState(false);
  // const
  const [SubOption, setSubOption] = useState(null);

  const [SubOptionTwo, setSubOptionTwo] = useState(null);

  const [TitleOfSubOption, setTitleOfSubOption] = useState("");
  const [TxtOfSubOption, setTxtOfSubOption] = useState("");
  const [TxtOfSubOptionTwo, setTxtOfSubOptionTwo] = useState("");

  const [GetOptionName, setGetOptionName] = useState(null);
  const [FinalOption, setFinalOption] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [limit, setLimit] = useState("");
  console.log("limit" ,limit)
  useEffect(() => {
    if (value === false) {
      setValue(true);
      dispatch(getProduct(id2))
        .unwrap()
        .then((res) => {
          setHeadersId(res.data.headers[0]?.id);
          setWidth(`${res.data.def_width}`);
          setHeight(`${res.data.def_height}`);
          setLimit(`${res.data.limit}`);
        });
      dispatch(
        getProductSummery(
          `?product_id=${id2}&width=${100}&height=${100}&quantity=${1}&limit=${limit}`
        )
      );
    }
  }, [dispatch, id2, value]);
  const [selected_op, setSelected] = useState([
    {
      section_id: 0,
      Option_id: 0,
      parent_id: 0,
    },
  ]);

  const [selected_op_New, setNewSelected] = useState([
    {
      section_id: 0,
      Option_id: 0,
      parent_id: 0,
    },
  ]);

  const [quantity, setQuantity] = useState(1);
  const [finishnotes, setFinishNotes] = useState("");

  const All_ids = selected_op
    .filter((ele) => ele.Option_id !== 0)
    .map((ele) => ele.Option_id);

  const SendDataOption = (OP_data) => {
    const Last_send_Ids = OP_data.filter((ele) => ele.Option_id !== 0).map(
      (ele) => ele.Option_id
    );
    let FinalData = [];
    for (let i = 0; i <= Last_send_Ids.length; i++) {
      if (Last_send_Ids[i] !== undefined) {
        FinalData = [...FinalData, `options[${i}]=${Last_send_Ids[i]}&`];
      }
    }

    dispatch(
      getProductSummery(
        `?product_id=${id2}&${FinalData.toString().replace(
          /,/g,
          ""
        )}&width=${width}&height=${height}&quantity=${quantity}`
      )
    );
  };

  
  const [Order_name, setOrderName] = useState(''); // Define and initialize the Order_name state
const [uploadedFilesCount, setUploadedFilesCount] = useState(0);
const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const AddToCart = () => {
    const data = {
      product_id: id2,
      quantity: quantity,
      width: width,
      height: height,
      options: All_ids,
      Files: selectedFiles,
      Order_name: Order_name, 
    };

    if (
      !localStorage.getItem("ut") ||
      localStorage.getItem("ut") === "undefind"
    ) {
      navigate("/login");
    } else {
      dispatch(AddToCartApi(data))
        .unwrap()
        .then(() => {
          dispatch(GetToCart());
        });
    }
  };


  const [HeadersId, setHeadersId] = useState(null);
  let today = new Date();
  let tomorrow = new Date(today.setDate(today.getDate() + 3));
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };


  const myToast = useRef(null);

  const showError = (severityValue, summaryValue, detailValue) => {
    myToast.current.show({ severity: severityValue, summary: summaryValue, detail: detailValue });
  };
const handleFileUpload = (e) => {
  const files = e.target.files;
  setSelectedFiles(Array.from(files));
  setUploadedFilesCount(files.length);

  let FinalData = [];
  for (let i = 0; i <= All_ids.length; i++) {
    if (All_ids[i] !== undefined) {
      FinalData = [
        ...FinalData,
        `options[${i}]=${All_ids[i]}&`,
      ];
    }
  }
  dispatch(
    getProductSummery(
      `?product_id=${id2}&${FinalData.toString().replace(
        /,/g,
        ""
      )}&width=${width}&height=${e.target.value}&quantity=${quantity}&uploadedFilesCount=${files.length}`
    )
  );
};





const updateFilesParameter = (count) => {
  let FinalData = [];
  for (let i = 0; i <= All_ids.length; i++) {
    if (All_ids[i] !== undefined) {
      FinalData = [
        ...FinalData,
        `options[${i}]=${All_ids[i]}&`,
      ];
    }
  }
  dispatch(
    getProductSummery(
      `?product_id=${id2}&${FinalData.toString().replace(
        /,/g,
        ""
      )}&width=${width}&height=${height}&quantity=${quantity}&files=${count}`
    )
  );
};



const handleFileDelete = () => {
  setSelectedFiles([]);
  setUploadedFilesCount(0);
  updateFilesParameter(0); // Call the function with 0
};

  useEffect(() => {
    if (summeryArr) {
      const data = summeryArr.options.slice(1, summeryArr.options.length);
      setGetOptionName(data);
    }
  }, [summeryArr]);
  return (
    <Helmet title={productArr?.meta_title}>
      <meta name="description" content={productArr?.meta_description} />

      <div className="Product_test">
        <div className="container-xxl">
          <div className="row Responsive_row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="CardTest">
                    <h1>{productArr?.title}</h1>
                    <div className="Toogelbuttons">
                      {productArr?.headers?.map((ele) => {
                        return (
                          <h2
                            key={ele.id}
                            onClick={() => {
                              setHeadersId(ele.id);
                            }}
                            className={`${
                              ele.id === HeadersId ? "ToggleActive" : ""
                            } `}
                            style={{ cursor: "pointer" }}
                          >
                            {ele.title}{" "}
                          </h2>
                        );
                      })}
                    </div>

                    {productArr?.headers?.map((ele) => {
                      return (
                        <div
                          key={ele.id}
                          style={{
                            display: ele.id === HeadersId ? "block" : "none",
                          }}
                        >
                          <p>{ele.description} </p>

                          <div className="row">
                            {ele.lines.map((ele, idx) => {
                              return (
                                <div
                                  className="col-md-6 ProCheck"
                                  key={`${ele} ${idx}`}
                                >
                                  <AiOutlineCheck />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="CardTest">
                    <h2>Create your order</h2>
                    <div className="row  aLLCenter">
                      <div className="col-md-6">
                        <div className="row cardCenter">
                          <div className="col-md-8">
                            <label htmlFor="Width ">Width </label>
                            <input
                              // keyfilter={"int"}
                              type="number"
                              value={width}
                              onChange={(e) => {
                                setWidth(e.target.value);

                                if (e.target.value < productArr?.min_width) {
                                  // setHeight(100);
                                  setWidthError(true);
                                } else if (
                                  e.target.value > productArr?.max_width
                                ) {
                                  setWidthError(true);
                                } else {
                                  setWidthError(false);

                                  let FinalData = [];
                                  for (let i = 0; i <= All_ids.length; i++) {
                                    if (All_ids[i] !== undefined) {
                                      FinalData = [
                                        ...FinalData,
                                        `options[${i}]=${All_ids[i]}&`,
                                      ];
                                    }
                                  }

                                  dispatch(
                                    getProductSummery(
                                      `?product_id=${id2}&${FinalData.toString().replace(
                                        /,/g,
                                        ""
                                      )}&width=${
                                        e.target.value
                                      }&height=${height}&quantity=${quantity}`
                                    )
                                  );
                                }
                              }}
                              className={`${
                                parseInt(width) <= 0 || width.length <= 0
                                  ? "p-invalid"
                                  : ""
                              } `}
                              name="Width"
                              id="Width"
                            />
                          </div>
                          <div className="col-md-4">cm</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row cardCenter">
                          <div className="col-md-8">
                            <label htmlFor="Height ">Height </label>
                            <input
                              // keyfilter={"int"}
                              type="number"
                              value={height}
                              onChange={(e) => {
                                setHeight(e.target.value);

                                if (e.target.value < productArr?.min_height) {
                                  // setHeight(100);
                                  setheightError(true);
                                } else if (
                                  e.target.value > productArr?.max_height
                                ) {
                                  setheightError(true);
                                } else {
                                  setheightError(false);

                                  let FinalData = [];
                                  for (let i = 0; i <= All_ids.length; i++) {
                                    if (All_ids[i] !== undefined) {
                                      FinalData = [
                                        ...FinalData,
                                        `options[${i}]=${All_ids[i]}&`,
                                      ];
                                    }
                                  }
                                  dispatch(
                                    getProductSummery(
                                      `?product_id=${id2}&${FinalData.toString().replace(
                                        /,/g,
                                        ""
                                      )}&width=${width}&height=${
                                        e.target.value
                                      }&quantity=${quantity}`
                                    )
                                  );
                                }
                              }}
                              className={`${
                                parseInt(height) <= 0 || height.length <= 0
                                  ? "p-invalid"
                                  : ""
                              } `}
                              name="Height"
                              id="Height"
                            />
                          </div>
                          <div className="col-md-4">cm</div>

                          {/* <div className="col">
                            <p></p>
                        </div> */}
                        </div>
                      </div>
                      {widthError || heightError ? (
                        <div className="col-12">
                          <p className="Dimenstion_error">
                            Maximum dimensions of a single piece:{" "}
                            {productArr?.max_width}x{productArr?.max_height} cm.
                            Larger sizes are joined by vertical pieces welded by
                            high frequency with a 2 cm overlap, and may have the
                            same or different sizes depending on the final
                            dimensions of the piece and its relationship with a
                            streamlined printing process. Minimum dimensions of
                            a single piece: {productArr?.min_width}x
                            {productArr?.min_height} cm.{" "}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="col-12">
                        <div className="row">
                          {/* -------------------------------------------------------------------------------------- */}
                          {productArr?.sections?.map((ele) => {
                            return (
                              <div className="col-12" key={ele.id}>
                                <div className="row">
                                  <div className="col-12">
                                    <label htmlFor="Height ">{ele.name} </label>
                                  </div>
                                  <div className="col-12">
                                    <div className="row">
                                      {ele.options?.map((e) => {
                                        return (
                                          <div className="col-md-6" key={e.id}>
                                            <div className="row cardCenter">
                                              <div className="col-md-12">
                                                <div
                                                  onClick={() => {
                                                    setSubOption(e);
                                                    const Option_data = {
                                                      section_id: parseFloat(
                                                        e.section_id
                                                      ),
                                                      Option_id: parseFloat(
                                                        e.id
                                                      ),
                                                    };
                                                    if (
                                                      selected_op.indexOf(
                                                        Option_data
                                                      ) === -1
                                                    ) {
                                                      const old_selected =
                                                        selected_op.filter(
                                                          (op) =>
                                                            parseFloat(
                                                              op.section_id
                                                            ) !==
                                                            parseFloat(
                                                              e.section_id
                                                            )
                                                        );

                                                      const New_selected = [
                                                        ...old_selected,
                                                        Option_data,
                                                      ];
                                                      setSelected(New_selected);

                                                      if (All_ids.length <= 0) {
                                                        dispatch(
                                                          getProductSummery(
                                                            `?product_id=${id2}&options[0]=${parseFloat(
                                                              e.id
                                                            )}&width=${width}&height=${height}&quantity=${quantity}`
                                                          )
                                                        );
                                                      } else {
                                                        // SendData();
                                                        SendDataOption(
                                                          New_selected
                                                        );
                                                      }
                                                    }
                                                  }}
                                                >
                                                  {e.image ? (
                                                    <>
                                                      <div
                                                        className="Card_Image"
                                                        style={{
                                                          borderColor:
                                                            All_ids.includes(
                                                              e.id
                                                            )
                                                              ? "#0a3565"
                                                              : "#d1d1d1",
                                                        }}
                                                      >
                                                        <div className="ImageTesetCon">
                                                          <img
                                                            src={e.image}
                                                            alt=""
                                                          />
                                                        </div>
                                                        <h3>{e.name}</h3>
                                                      </div>
                                                      <p>{e.description}</p>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <div
                                                        className="Chose text-center "
                                                        style={{
                                                          borderColor:
                                                            All_ids.includes(
                                                              e.id
                                                            )
                                                              ? "#0a3565"
                                                              : "#d1d1d1",
                                                        }}
                                                      >
                                                        {e.name}
                                                      </div>
                                                      <p>{e.description}</p>
                                                    </>
                                                  )}
                                                   {console.log(SubOption)}
                                                  {SubOption ?
                                                    e.id == SubOption.id ? 
                                                    <div className="row">
                                                    {SubOption ? (
                                                      <div className="row">
                                                        {SubOption.childrens.map(
                                                          (item) => {
                                                            return (
                                                              <div
                                                                key={item.id}
                                                                className="col-12"
                                                              >
                                                                {/* -------------------------------------- */}
                                                                <div>
                                                                  <label htmlFor="Height ">
                                                                    {item.name}
                                                                  </label>
                                                                  <div className="row">
                                                                    {item.childrens.map(
                                                                      (
                                                                        item
                                                                      ) => {
                                                                        return (
                                                                          <div
                                                                            key={
                                                                              item.id
                                                                            }
                                                                            className="col-6"
                                                                          >
                                                                            {/* -------------------------------------- */}
                                                                            <div
                                                                              style={{
                                                                                textAlign:
                                                                                  "center",
                                                                              }}
                                                                              onClick={() => {
                                                                                setSubOptionTwo(
                                                                                  item
                                                                                );
                                                                                setTxtOfSubOption(
                                                                                  item.name
                                                                                );
                                                                                const Option_data =
                                                                                  {
                                                                                    section_id:
                                                                                      parseFloat(
                                                                                        item.section_id
                                                                                      ),
                                                                                    Option_id:
                                                                                      parseFloat(
                                                                                        item.id
                                                                                      ),
                                                                                    parent_id:
                                                                                      parseFloat(
                                                                                        item.parent_id
                                                                                      ),
                                                                                  };
                                                                                if (
                                                                                  selected_op.indexOf(
                                                                                    Option_data
                                                                                  ) ===
                                                                                  -1
                                                                                ) {
                                                                                  const old_selected =
                                                                                    selected_op.filter(
                                                                                      (
                                                                                        op
                                                                                      ) =>
                                                                                        parseFloat(
                                                                                          op.parent_id
                                                                                        ) !==
                                                                                        parseFloat(
                                                                                          item.parent_id
                                                                                        )
                                                                                    );
                                                                                  const New_selected =
                                                                                    [
                                                                                      ...old_selected,
                                                                                      Option_data,
                                                                                    ];
                                                                                  setSelected(
                                                                                    New_selected
                                                                                  );
                                                                                  if (
                                                                                    All_ids.length <=
                                                                                    0
                                                                                  ) {
                                                                                    dispatch(
                                                                                      getProductSummery(
                                                                                        `?product_id=${id2}&options[0]=${parseFloat(
                                                                                          item.id
                                                                                        )}&width=${width}&height=${height}&quantity=${quantity}`
                                                                                      )
                                                                                    );
                                                                                  } else {
                                                                                    // SendData();
                                                                                    SendDataOption(
                                                                                      New_selected
                                                                                    );
                                                                                  }
                                                                                }
                                                                              }}
                                                                            >
                                                                              {item.image ? (
                                                                                <>
                                                                                  <div
                                                                                    className="Card_Image"
                                                                                    style={{
                                                                                      borderColor:
                                                                                        All_ids.includes(
                                                                                          item.id
                                                                                        )
                                                                                          ? "#0a3565"
                                                                                          : "#d1d1d1",
                                                                                    }}
                                                                                  >
                                                                                    <img
                                                                                      src={
                                                                                        item.image
                                                                                      }
                                                                                      alt=""
                                                                                      width={
                                                                                        100
                                                                                      }
                                                                                      height={
                                                                                        100
                                                                                      }
                                                                                    />
                                                                                  </div>

                                                                                  <h3>
                                                                                    {
                                                                                      item.name
                                                                                    }
                                                                                  </h3>
                                                                                </>
                                                                              ) : (
                                                                                <>
                                                                                  <div
                                                                                    className="Chose text-center "
                                                                                    style={{
                                                                                      borderColor:
                                                                                        All_ids.includes(
                                                                                          item.id
                                                                                        )
                                                                                          ? "#0a3565"
                                                                                          : "#d1d1d1",
                                                                                    }}
                                                                                  >
                                                                                    {
                                                                                      item.name
                                                                                    }
                                                                                  </div>
                                                                                  <p
                                                                                    style={{
                                                                                      textAlign:
                                                                                        "left",
                                                                                      color:
                                                                                        "red",
                                                                                      marginLeft:
                                                                                        "15px",
                                                                                    }}
                                                                                  >
                                                                                    {
                                                                                      item.description
                                                                                    }
                                                                                  </p>
                                                                                </>
                                                                              )}

                                                                              {/* *********************** */}
                                                                              <div className="row">
                                                                                {SubOptionTwo &&
                                                                                SubOptionTwo.id ===
                                                                                  item.id ? (
                                                                                  <div className="row">
                                                                                    {SubOptionTwo.childrens.map(
                                                                                      (
                                                                                        element
                                                                                      ) => {
                                                                                        return (
                                                                                          <div
                                                                                            key={
                                                                                              element.id
                                                                                            }
                                                                                            className="col-6"
                                                                                          >
                                                                                            {/* -------------------------------------- */}
                                                                                            <div
                                                                                              style={{
                                                                                                textAlign:
                                                                                                  "center",
                                                                                              }}
                                                                                              onClick={() => {
                                                                                                setTxtOfSubOptionTwo(
                                                                                                  element.name
                                                                                                );
                                                                                                const Option_data =
                                                                                                  {
                                                                                                    section_id:
                                                                                                      parseFloat(
                                                                                                        element.section_id
                                                                                                      ),
                                                                                                    Option_id:
                                                                                                      parseFloat(
                                                                                                        element.id
                                                                                                      ),
                                                                                                    parent_id:
                                                                                                      parseFloat(
                                                                                                        element.parent_id
                                                                                                      ),
                                                                                                  };
                                                                                                if (
                                                                                                  selected_op.indexOf(
                                                                                                    Option_data
                                                                                                  ) ===
                                                                                                  -1
                                                                                                ) {
                                                                                                  const old_selected =
                                                                                                    selected_op.filter(
                                                                                                      (
                                                                                                        op
                                                                                                      ) =>
                                                                                                        parseFloat(
                                                                                                          op.parent_id
                                                                                                        ) !==
                                                                                                        parseFloat(
                                                                                                          element.parent_id
                                                                                                        )
                                                                                                    );
                                                                                                  const New_selected =
                                                                                                    [
                                                                                                      ...old_selected,
                                                                                                      Option_data,
                                                                                                    ];

                                                                                                  setTimeout(() => {
                                                                                                    setSelected(
                                                                                                      New_selected
                                                                                                    );
                                                                                                    if (
                                                                                                      All_ids.length <=
                                                                                                      0
                                                                                                    ) {
                                                                                                      dispatch(
                                                                                                        getProductSummery(
                                                                                                          `?product_id=${id2}&options[0]=${parseFloat(
                                                                                                            element.id
                                                                                                          )}&width=${width}&height=${height}&quantity=${quantity}`
                                                                                                        )
                                                                                                      );
                                                                                                    } else {
                                                                                                      // SendData();
                                                                                                      SendDataOption(
                                                                                                        New_selected
                                                                                                      );
                                                                                                    }
                                                                                                  }, []);
                                                                                                }
                                                                                              }}
                                                                                            >
                                                                                              {element.image ? (
                                                                                                <>
                                                                                                  <div
                                                                                                    className="Card_Image"
                                                                                                    style={{
                                                                                                      borderColor:
                                                                                                        All_ids.includes(
                                                                                                          element.id
                                                                                                        )
                                                                                                          ? "#0a3565"
                                                                                                          : "#d1d1d1",
                                                                                                    }}
                                                                                                  >
                                                                                                    <img
                                                                                                      src={
                                                                                                        element.image
                                                                                                      }
                                                                                                      alt=""
                                                                                                      width={
                                                                                                        100
                                                                                                      }
                                                                                                      height={
                                                                                                        100
                                                                                                      }
                                                                                                    />
                                                                                                  </div>

                                                                                                  <h3>
                                                                                                    {
                                                                                                      element.name
                                                                                                    }
                                                                                                  </h3>
                                                                                                </>
                                                                                              ) : (
                                                                                                <>
                                                                                                  <div
                                                                                                    className="Chose text-center "
                                                                                                    style={{
                                                                                                      borderColor:
                                                                                                        All_ids.includes(
                                                                                                          element.id
                                                                                                        )
                                                                                                          ? "#0a3565"
                                                                                                          : "#d1d1d1",
                                                                                                    }}
                                                                                                  >
                                                                                                    {
                                                                                                      element.name
                                                                                                    }
                                                                                                  </div>
                                                                                                  <p
                                                                                                    style={{
                                                                                                      textAlign:
                                                                                                        "left",
                                                                                                      color:
                                                                                                        "red",
                                                                                                      marginLeft:
                                                                                                        "15px",
                                                                                                    }}
                                                                                                  >
                                                                                                    {
                                                                                                      element.description
                                                                                                    }
                                                                                                  </p>
                                                                                                </>
                                                                                              )}
                                                                                            </div>
                                                                                            {/* -------------------------------------- */}
                                                                                          </div>
                                                                                        );
                                                                                      }
                                                                                    )}
                                                                                  </div>
                                                                                ) : null}
                                                                              </div>

                                                                              {/* *********************** */}
                                                                            </div>
                                                                            {/* -------------------------------------- */}
                                                                          </div>
                                                                        );
                                                                      }
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            );
                                                          }
                                                        )}
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                   : null
                                                   : null}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}

                                      {/* ********************************   */}

                                      {/* ********************************   */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="row cardCenter">
                          <div className="col-md-12">
                            <label htmlFor="Height ">Quantity</label>
                            <p> Finishing Notes</p>
                            <input
                              type="number"
                              max={limit}
                              value={quantity}
                              
                              onChange={(e) => {
                                if (quantity > limit) {
                                  document.querySelector('.limit').style.opacity = 1;
                                } else {
                                  document.querySelector('.limit').style.opacity = 0; // Hide the <p> element
                                }
                                if (quantity < e.target.value) {
                                  document.querySelector('.limit').style.opacity = 0; // Hide the <p> element
                                }
                                let FinalData = [];
                                for (let i = 0; i <= All_ids.length; i++) {
                                  if (All_ids[i] !== undefined) {
                                    FinalData = [
                                      ...FinalData,
                                      `options[${i}]=${All_ids[i]}&`,
                                    ];
                                  }
                                }
                                if (e.target.value <= 0) {
                                  setQuantity(1);
                                  dispatch(
                                    getProductSummery(
                                      `?product_id=${id2}&${FinalData.toString().replace(
                                        /,/g,
                                        ""
                                      )}&width=${width}&height=${height}&quantity=${1}`
                                    )
                                  );
                                } else {
                                  setQuantity(e.target.value);
                                  dispatch(
                                    getProductSummery(
                                      `?product_id=${id2}&${FinalData.toString().replace(
                                        /,/g,
                                        ""
                                      )}&width=${width}&height=${height}&quantity=${
                                        e.target.value
                                      }`
                                    )
                                  );
                                }
                              }}
                            />
                            <p class="limit" >Please select a quantity less than or equal to {limit}</p>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{
                  height: "100%",
                }}
              >
                {productArr && (
                  <div>
                    <div className="CardTest">
                      <SwiperProducts elements={productArr.images} />
                    </div>
                  </div>
                )}

                <div className="order_now">
                  {summeryArr && (
                    <div className="CardTest ">
                      <h2 className="mb-3">Order Summary</h2>
                      <div>
                        <div className="d-flex flex-wrap">
                          <h5>
                            {summeryArr.options.length > 0
                              ? summeryArr.options[0].section + " : "
                              : null}{" "}
                          </h5>
                          <span>
                            {summeryArr.options.length > 0
                              ? summeryArr.options[0].name
                              : null}
                          </span>
                          {GetOptionName
                            ? GetOptionName.map((item) => {
                                return <span>{` - ${item.name} `}</span>;
                              })
                            : null}
                        </div>
                      </div>

                      <div className="d-flex">
                        <h5>Quantity:</h5>
                        <span> {summeryArr.quantity}</span>
                      </div>
                      <div className="d-flex ">
                        <h5>Arrive on:</h5>
                        <span>
                          {tomorrow.toLocaleDateString("en-US", options)}
                        </span>
                      </div>
                      
                      <div className="d-flex align-items-center font_grow_div ">
                        <h5 className="font_grow">Total:</h5>
                        <span className="span_active">
                          {" "}
                          {summeryArr.total.toFixed(2)} &euro;
                        </span>
                      </div>
                      <div className="mb-4 Order_name">
                            <label htmlFor="Order_name">Order name </label>
                            <input
                              type="text"
                              onChange={(e) => {
                                setOrderName(e.target.value);
                              }}

                              className={`${
                                parseInt(Order_name) <= 0 || Order_name.length <= 0
                                  ? "p-invalid"
                                  : ""
                              } `}
                              name="Order_name"
                              id="Order_name"
                            />
                          </div>
                      <button
                        className="AddToCartBtn"
                        onClick={() => {
                          AddToCart();
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  )}
                </div>
                <div className="btn-fils">
              <div className="btn-upload"> 
              <input
  type="file"
  multiple={true}
  className="file-input"
  onChange={(e) => {
    const files = e.target.files;

    // Check if the number of selected files exceeds the maximum limit (10 in this case)
    if (files.length > 10) {
      showError('error', 'Error Message', 'You can only upload a maximum of 10 files.');
      e.target.value = null;
      return;
    }

    setSelectedFiles(Array.from(files));
    setUploadedFilesCount(files.length);
    updateFilesParameter(files.length);
    let FinalData = [];
    for (let i = 0; i < All_ids.length; i++) {
      if (All_ids[i] !== undefined) {
        FinalData = [
          ...FinalData,
          `options[${i}]=${All_ids[i]}&`,
        ];
      }
    }
    dispatch(
      getProductSummery(
        `?product_id=${id2}&${FinalData.toString().replace(
          /,/g,
          ""
        )}&width=${width}&height=${height}&quantity=${quantity}&files=${files.length}`
      )
    );
  }}
/>

                <span>Upload</span>  
                </div>
        
      <button className="btn-delete" onClick={handleFileDelete}>
       <span>Delete</span>  
      </button>
   
      {/* <p> {uploadedFilesCount}</p> */}
        
                </div>
                
                <div className="order_now order_now_button">
                  {summeryArr && (
                    <div className="CardTest ">
                      <button
                        className="AddToCartBtn"
                        onClick={() => {
                          AddToCart();
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* {productArr?.footers?.map((ele) => {
          return (
            <div key={ele.id}>
              <h2>{ele.title}</h2>
              <p>{ele.description}</p>
            </div>
          );
        })} */}

          {productArr && (
            <div
              className="article_body"
              id={"artContent"}
              dangerouslySetInnerHTML={{
                __html: productArr?.footers.description,
              }}
            ></div>
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default TestProduct;