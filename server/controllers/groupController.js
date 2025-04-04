const Group = require("../models/Group");

// Создание новой группы
exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    // Проверка наличия участников
    if (!members || members.length === 0) {
      return res
        .status(400)
        .json({ message: "Группа должна содержать участников" });
    }

    const newGroup = new Group({
      name,
      members,
      createdBy: req.user.id,
    });

    const savedGroup = await newGroup.save();

    // Пополняем данные о пользователях
    const populatedGroup = await Group.findById(savedGroup._id)
      .populate("members", "-password")
      .populate("createdBy", "-password");

    res.status(201).json(populatedGroup);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Группа с таким названием уже существует" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Получение всех групп
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find()
      .populate("members", "-password")
      .populate("createdBy", "-password");

    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение группы по ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members", "-password")
      .populate("createdBy", "-password");

    if (!group) {
      return res.status(404).json({ message: "Группа не найдена" });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление группы
exports.updateGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Группа не найдена" });
    }

    // Проверка прав: только создатель может изменять
    if (
      group.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Нет прав для изменения группы" });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate("members", "-password")
      .populate("createdBy", "-password");

    res.json(updatedGroup);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Группа с таким названием уже существует" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Удаление группы
exports.deleteGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Группа не найдена" });
    }

    // Проверка прав: только создатель или админ
    if (
      group.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Нет прав для удаления группы" });
    }

    await group.deleteOne();
    res.json({ message: "Группа успешно удалена" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Дополнительные методы

// Добавление участника в группу
exports.addGroupMember = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Группа не найдена" });
    }

    if (group.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Только создатель может добавлять участников" });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: req.body.userId } },
      { new: true }
    ).populate("members", "-password");

    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление участника из группы
exports.removeGroupMember = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Группа не найдена" });
    }

    if (
      group.createdBy.toString() !== req.user.id &&
      req.user.id !== req.params.userId
    ) {
      return res.status(403).json({
        message: "Только создатель или сам пользователь могут покинуть группу",
      });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.params.userId } },
      { new: true }
    ).populate("members", "-password");

    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
