//Trang danh sách tài sản
class AssetPage {

    constructor(gridId){
        let me = this;

        // Lưu lại giá trị trang
        me.grid = $(gridId);

        // Khởi tạo sự kiện trên trang
        me.initEvents();
    }

    /**
     * Hàm khởi tạo các sự kiện
     * NTDIEM 31.05.2021
     */
    initEvents() {
        let me = this;

        // Khởi tạo sự kiện đổi background khi click vào row
        me.grid.on("click", "tbody tr", function() {
            me.grid.find(".selected-row").removeClass("selected-row");

            $(this).addClass("selected-row");
        });
    }

    /**
     * Hàm dùng để render dữ liệu danh sách tài sản
     * NTDIEM 31.05.2021
     */
    loadData(data) {
        let me = this,
            table = $("<table></table>"),
            thead = me.renderHeader(),
            tbody = me.renderTbody(data);

        table.append(thead);
        table.append(tbody);

        // Append bảng và remove bảng phiên bản cũ
        me.grid.find("table").remove();
        me.grid.append(table);
    }

    /**
     * Hàm dùng để render header table
     * NTDIEM 31.05.2021
     */
    renderHeader() {
        let me = this,
            thead = $("<thead></thead>"),
            row = $("<tr></tr>").append("<th></th>").append($("<input>").attr("type","checkbox"));

        // Duyệt các cột để xây header(this.text() ở đây là nội dung của các thẻ .col)
        me.grid.find(".col").each(function() {
            let name = $(this).text(),
                th = $("<th></th>");
            
            th.text(name);
            row.append(th);
        });

        // Append row vào header
        thead.append(row);
        
        return thead;
    }

    /**
     * HÀm dùng để renderra Tbody
     * @param {Hàm} data
     * NTDIEM 31.05.2021
     */
    renderTbody(data) {
        let me = this,
            tbody = $("<tbody></tbody>");

        if(data && data.length > 0){
            data.filter(item =>{
                let row = $("<tr></tr>").append("<th></th>").append($("<input>").attr("type","checkbox"));

                // Duyệt từng cột
                me.grid.find(".col").each(function() {
                    let fieldName = $(this).attr("FieldName"),
                    dataType = $(this).attr("DataType"),
                    data = item[fieldName],
                    cell = $("<td></td>"),
                    className = me.getClassFormat(dataType),
                    value = me.getValue(data, dataType);

                cell.text(value);
                cell.addClass(className);

                row.append(cell);
                });

                tbody.append(row);
            });
        }

        return tbody;
    }

    /**
     * HÀm add class format cho từng kiểu dữ liệu
     * NTDIEM 31.05.2021
     * @param {Hàm} dataType 
     */
    getClassFormat(dataType) {
        let me = this,
            className = "";
        
        switch(dataType)
        {
            case "Number":
                className = "align-center";
                break
            case "Money":
                className = "align-right";
                break;
            case "Date":
                className = "align-center";
                break;
        }

        return className;
    }

    /**
     * Hàm lấy dữ liệu chuẩn hóa
     * NTDIEM 31.05.2021
     * @param {Hàm} data 
     * @param {Hàm} dataType 
     */
    getValue(data, dataType) {
        let me = this;

        switch(dataType) 
        {
            case "Money":
                data = formatMoney(data);
                break;
            case "Number":
                break;
            case "Date":
                break;
        }

        return data;
    }
}

// Khởi tạo dối tượng tài sản
let assetPage = new AssetPage("#gridAsset");

// Gọi hàm để load dữ liệu
assetPage.loadData(assetList);