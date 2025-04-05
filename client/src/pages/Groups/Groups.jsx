import React, { useEffect } from "react";
import "./Groups.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, searchGroups } from "../../redux/actions/groupActions";
import { Link } from "react-router-dom";
import Search from "@components/Search";
import GroupCard from "./GroupCard";

function Groups() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  const handleSearch = (query) => {
    if (query) {
      dispatch(searchGroups(query));
    } else {
      dispatch(getAllGroups());
    }
  };

  const {
    allGroups: groups,
    loading,
    error,
  } = useSelector((state) => state.group);
  return (
    <div className="groups">
      <div className="groups__wrapper">
        <h1 className="groups__title">Группы</h1>
        <Search onSearch={handleSearch} />
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка! {error}</p>}
        <ul className="groups__list">
          {groups.groups?.map((group) => (
            <li className="groups__item" key={group._id}>
              <Link to={`/groups/${group._id}`}>
                <GroupCard groupName={group.name} members={group.members} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Groups;
