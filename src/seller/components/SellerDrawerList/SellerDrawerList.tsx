import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Dashboard,
  Inventory,
  Logout,
  Receipt,
  ShoppingBag
} from "@mui/icons-material";
import DrawerList, { MenuItem } from "../../../components/DrawerList/DrawerList";
import { useAppSelector } from "../../../states/store";
import { EAccountStatus } from "../../../types/SellerTypes";


const menu: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard className="text-[var(--primary-color)]" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Orders",
    path: `/seller/orders/${1}`,
    icon: <ShoppingBag className="text-[var(--primary-color)]" />,
    activeIcon: <ShoppingBag className="text-white" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory className="text-[var(--primary-color)]" />,
    activeIcon: <Inventory className="text-white" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product/-1",
    icon: <Add className="text-[var(--primary-color)]" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWallet className="text-[var(--primary-color)]" />,
    activeIcon: <AccountBalanceWallet className="text-white" />,
  },

];

const menu2 : MenuItem[] = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-[var(--primary-color)]" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/become-seller",
    icon: <Logout className="text-[var(--primary-color)]" />,
    activeIcon: <Logout className="text-white" />,
  },
];

const SellerDrawerList = ({toggleDrawer} : {toggleDrawer : any}) => {
  const sellerState = useAppSelector((store) => store.seller);


  return <>
    <DrawerList menu1={sellerState.profile?.accountStatus === EAccountStatus.ACTIVE 
      && sellerState.profile?.acceptTerms === true ? menu : []
    } menu2={menu2} toggleDrawer={()=>{}}/>
  </>;
};

export default SellerDrawerList;
