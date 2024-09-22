import Avatar from '@/components/ui/Avatar';
import Dropdown from '@/components/ui/Dropdown';
import withHeaderItem from '@/utils/hoc/withHeaderItem';
import { apiSignOut } from '../../views/auth/auth.service';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearAuth } from '@/views/auth/auth.slice'
import { setUser, clearUser } from '@/views/user/user.slice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import type { CommonProps } from '@/@types/common';


type DropdownList = {
    label: string;
    path: string;
    icon: JSX.Element;
};

const dropdownItemList: DropdownList[] = [];

const _UserDropdown = ({ className }: CommonProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(clearAuth());
        dispatch(clearUser()); 
    
        localStorage.removeItem('authToken');
        navigate('/unauthenticated-entry');
    };

    const user = useAppSelector(state => state.user); // Get user state

    const signOut = async () => {
        try {
            await apiSignOut();
            handleSignOut();
        } catch (error) {
            console.error("Sign out failed", error);
            // Optionally show an error message to the user
        }
    };

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
            <div className="hidden md:block">
                <div className="text-xs capitalize">{user.role}</div>
                <div className="font-bold">{user.firstName}</div>
            </div>
        </div>
    );

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" icon={<HiOutlineUser />} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {user.firstName}
                            </div>
                            <div className="text-xs">{user.email}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link 
                            className="flex h-full w-full px-2" 
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                {/* <Dropdown.Item variant="divider" /> */}
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    onClick={signOut}
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

const UserDropdown = withHeaderItem(_UserDropdown);

export default UserDropdown;
