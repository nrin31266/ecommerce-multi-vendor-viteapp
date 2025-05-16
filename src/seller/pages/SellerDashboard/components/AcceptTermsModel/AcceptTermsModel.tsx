import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(600px, 98%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
  maxHeight: "80vh",
  overflowY: "auto",
};

interface AcceptTermsModelProps {
  isVisible: boolean;
  onClose: () => void;
  onAccept: () => void;
  loading: boolean;
}

const AcceptTermsModel = ({
  isVisible,
  onClose,
  onAccept,
  loading
}: AcceptTermsModelProps) => {
  const [accepted, setAccepted] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccepted(event.target.checked);
  };

  const handleAcceptClick = () => {
    if (accepted) {
      onAccept();
      onClose();
    }
  };

  return (
    <Modal
      open={isVisible}
      onClose={onClose}
      aria-labelledby="terms-title"
      aria-describedby="terms-description"
    >
      <Box sx={style}>
        <Typography id="terms-title" variant="h6" component="h2" gutterBottom>
          Điều khoản sử dụng hệ thống bán hàng đa nhà cung cấp
        </Typography>

        <Typography
          id="terms-description"
          sx={{ mb: 2, whiteSpace: "pre-line" }}
          variant="body1"
        >
          {`Chào mừng bạn đến với hệ thống bán hàng đa nhà cung cấp của chúng tôi!

Bằng việc trở thành Seller trên nền tảng này, bạn đồng ý tuân thủ các quy định và điều khoản sau:

1. Đảm bảo sản phẩm đăng bán là chính xác, hợp pháp, không vi phạm bản quyền, luật pháp hiện hành.
2. Tuân thủ chính sách giao hàng, đổi trả và chăm sóc khách hàng do hệ thống quy định.
3. Không sử dụng nền tảng cho mục đích gian lận, lừa đảo hoặc vi phạm đạo đức thương mại.
4. Hệ thống có quyền từ chối hoặc gỡ bỏ sản phẩm vi phạm, hoặc khóa tài khoản nếu phát hiện vi phạm nghiêm trọng.
5. Seller có trách nhiệm cập nhật thông tin liên hệ, sản phẩm và tình trạng tồn kho chính xác.
6. Mọi tranh chấp sẽ được giải quyết theo chính sách của nền tảng và pháp luật Việt Nam.

Vui lòng đọc kỹ và chấp nhận các điều khoản trên trước khi tiếp tục sử dụng dịch vụ.`}
        </Typography>

        <FormControlLabel
          control={
            <Checkbox checked={accepted} onChange={handleCheckboxChange} />
          }
          label="Tôi đã đọc và đồng ý với các điều khoản sử dụng"
        />

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={handleAcceptClick}
            disabled={!accepted || loading}
            loading={loading}
          >
            Đồng ý và tiếp tục
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AcceptTermsModel;
