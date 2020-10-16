import React, {useState} from 'react'
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu; // Menu.SunMenu

const Header = () => {
  const [current, setCurrent] = useState('home')

  const handleClick = (e) => {
    setCurrent(e.key);
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        Home
      </Item>
      <Item key="register" icon={<UserAddOutlined/>} className="float-right">
        Register
      </Item>
      <Item key="login" icon={<UserOutlined/>} className="float-right">
        Login
      </Item>
      <SubMenu key="SubMenu" icon={<SettingOutlined/>} title="Username">
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
      </SubMenu>

    </Menu>
  );
}

export default Header

