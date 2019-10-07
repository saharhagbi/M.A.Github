package System;

import Objects.Item;

import java.util.ArrayList;
import java.util.List;

public class FolderDifferences
{
    private List<Item> m_AddedItemList;
    private List<Item> m_RemovedItemList;
    private List<Item> m_ChangedItemList;

    public FolderDifferences()
    {
        m_AddedItemList = new ArrayList<>();
        m_RemovedItemList = new ArrayList<>();
        m_ChangedItemList = new ArrayList<>();
    }

    public List<Item> GetAddedItemList()
    {
        return m_AddedItemList;
    }

    public List<Item> GetRemovedItemList()
    {
        return m_RemovedItemList;
    }

    public List<Item> GetChangedItemList()
    {
        return m_ChangedItemList;
    }

    public void AddToAddedItemList(Item i_AddedItem)
    {
        m_AddedItemList.add(i_AddedItem);
    }

    public void AddToRemovedItemList(Item i_RemovedItem)
    {
        m_RemovedItemList.add(i_RemovedItem);
    }

    public void AddToChangedItemList(Item i_ChangedItem)
    {
        m_ChangedItemList.add(i_ChangedItem);
    }

    public void AddAnEntireFolderDifference(FolderDifferences i_FolderDifference)
    {
        for (int i = 0; i < i_FolderDifference.m_AddedItemList.size(); i++)
        {
            m_AddedItemList.add(i_FolderDifference.m_AddedItemList.get(i));
        }
        for (int i = 0; i < i_FolderDifference.m_ChangedItemList.size(); i++)
        {
            m_ChangedItemList.add(i_FolderDifference.m_ChangedItemList.get(i));
        }
        for (int i = 0; i < i_FolderDifference.m_RemovedItemList.size(); i++)
        {
            m_RemovedItemList.add(i_FolderDifference.m_RemovedItemList.get(i));
        }
    }
}

