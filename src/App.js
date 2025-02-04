import Header from "./Body/Header.js";
import Main from "./Body/Main.js";
import { ChatButton, UserInfo } from "./components/Auth/Chat.js";
import { OutButton } from "./components/Auth/Dashboard.js";
import { AppMenu } from "./navigate.js";

export function App() {
  return (
    <div className="app">
      <AppMenu />
      <Header />
      <Main />
    </div>
  )
}

export function App2() {
  return (
    <div className="app">
      <h2 className="zagolovok">Хор "Осанна"</h2>
      <ChatButton currentUser={'user'}/>
      <UserInfo />
      <OutButton />
      <Header />
      <Main />
    </div>
  )
}